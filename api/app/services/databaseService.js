import { CosmosClient } from '@azure/cosmos'

import config from '#config'

const USER_COLLECTION = 'User'
const PLANT_COLLECTION = 'Plant'
const JOURNAL_ENTRY_COLLECTION = 'JournalEntry'

let database = null

export const initializeDatabase = () => {
  const endpoint = config.db.cosmos_endpoint
  const key = config.db.cosmos_key

  const client = new CosmosClient({ endpoint, key })
  database = client.database(config.db.cosmos_db_id)
}

export const getContainer = containerName => {
  if (!database) {
    throw new Error('Database not initialized')
  }
  switch (containerName) {
    case 'User':
      return database.container(USER_COLLECTION)
    case 'Plant':
      return database.container(PLANT_COLLECTION)
    case 'JournalEntry':
      return database.container(JOURNAL_ENTRY_COLLECTION)
    default:
      throw new Error('Unknown record type')
  }
}

export const saveRecord = async (containerName, record) => {
  const container = getContainer(containerName)
  try {
    const { resource } = await container.items.create(record)
    return resource
  } catch (error) {
    console.error(error.message)
    return null
  }
}

export const getRecord = async (containerName, id) => {
  const container = getContainer(containerName)
  try {
    const { resource } = await container.item(id, id).read()
    return resource
  } catch (error) {
    console.log(error.message)
    return null
  }
}

export const updateRecord = async (containerName, id, updatedData) => {
  const container = getContainer(containerName)
  try {
    const { resource: existingRecord } = await container.item(id, id).read()
    if (!existingRecord) {
      throw new Error('Record not found')
    }
    const updatedRecord = { ...existingRecord, ...updatedData }
    const { resource } = await container.items.upsert(updatedRecord)
    return resource
  } catch (error) {
    console.error(error.message)
    return null
  }
}

export const upsertRecord = async (containerName, record) => {
  const container = getContainer(containerName)
  const { resource } = await container.items.upsert(record)
  return resource
}
/*
export const filterRecords = async (containerName, filterQuery) => {
  const container = getContainer(containerName)

  try {
    const { resources } = await container.items
      .query(filterQuery, { enableCrossPartitionQuery: true })
      .fetchAll()
    return resources.length > 0 ? resources : null
  } catch (error) {
    console.log(error.message)
    return null
  }
}
  */

// Input a user id and then a key value pair dictionary of filters
export const filterRecords = async (containerName, userId, filters) => {
  const container = getContainer(containerName)

  const filterConditions = []
  const parameters = []

  filterConditions.push(`c.userId = @${userId}`)
  for (const [key, value] of Object.entries(filters)) {
    filterConditions.push(`c.${key} = @${key}`)
    parameters.push({ name: `@${key}`, value })
  }

  const filterQuery = {
    query: `SELECT * FROM c WHERE ${filterConditions.join(' AND ')}`,
    parameters,
  }

  try {
    const { resources } = await container.items
      .query(filterQuery, { enableCrossPartitionQuery: true })
      .fetchAll()
    return resources.length > 0 ? resources : null
  } catch (error) {
    console.log(error.message)
    return null
  }
}

export const listRecords = async (containerName, field, val) => {
  try {
    const query = {
      query: `SELECT * FROM c WHERE c.${field} = @value`,
      parameters: [{ name: '@value', value: val }],
    }
    return await filterRecords(containerName, query)
  } catch (error) {
    console.log(error.message)
    return null
  }
}

export const getAll = async containerName => {
  const container = getContainer(containerName)
  try {
    const query = {
      query: `SELECT * FROM c`,
    }
    const { resources } = await container.items
      .query(query, { enableCrossPartitionQuery: true })
      .fetchAll()
    return resources.length > 0 ? resources : []
  } catch (error) {
    console.log(error.message)
    return null
  }
}

export const getAllPlants = async () => {
  return await getAll('Plant')
}

export const getAllJournals = async () => {
  return await getAll('JournalEntry')
}

export const deleteRecord = async (containerName, id) => {
  const container = getContainer(containerName)
  try {
    const { resource } = await container.item(id).delete()
    if (!resource) {
      throw new Error(`Record with ID ${id} not found`)
    }
    return id
  } catch (error) {
    console.error(`Error deleting record with ID ${id}:`, error.message)
    return null
  }
}

export const deleteAllItems = async containerName => {
  const container = getContainer(containerName)
  try {
    // Query to get all items in the container
    const { resources: items } = await container.items.query('SELECT * FROM c').fetchAll()

    if (!items || items.length === 0) {
      console.log('No items found in the container to delete.')
      return []
    }

    // Delete each item
    const deletePromises = items.map(item => container.item(item.id, item.partitionKey).delete())
    const results = await Promise.all(deletePromises)

    console.log(`Deleted ${results.length} items from the container.`)
    return results
  } catch (error) {
    console.error('Error deleting all items:', error.message)
    return null
  }
}

export const deleteAllPlants = async () => {
  await deleteAllItems('Plant')
}
