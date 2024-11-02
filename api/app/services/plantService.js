import config from '#config'

import {
  filterRecords,
  listRecords,
  getRecord,
  saveRecord,
  updateRecord,
  upsertRecord,
  deleteRecord,
  getAllPlants,
} from '#services/databaseService.js'

export const createPlant = async plant => await saveRecord('Plant', plant)

export const getPlantById = async id => await getRecord('Plant', id)

export const listPlants = async () => await getAllPlants()

export const deletePlantById = async id => await deleteRecord('Plant', id)

export const updatePlantById = async (id, data) => await updateRecord('Plant', id, data)
