import config from '#config'
import {
  filterRecords,
  listRecords,
  getRecord,
  saveRecord,
  updateRecord,
  upsertRecord,
  deleteRecord,
} from '#services/DatabaseService.js'

export const createPlant = async user => await saveRecord('Plant', plant)

export const getPlantById = async id => await getRecord('Plant', id)

export const listPlants = async (field, value) => await getRecord('Plant', field, value)

export const listPlantsFilter = async (userId, filters) =>
  await filterRecords('Plant', userId, filters)

export const deletePlantById = async id => await deleteRecord('Plant', id)

export const updatePlantById = async (id, data) => await updateRecord('Plant', id, data)
