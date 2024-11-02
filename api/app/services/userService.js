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

export const createUser = async user => await saveRecord('User', user)

export const getUserById = async id => await getRecord('User', id)

export const deleteUserById = async id => await deleteRecord('User', id)

export const updateUserById = async (id, data) => await updateRecord('User', id, data)
