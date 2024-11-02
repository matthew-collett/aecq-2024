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

export const createJournal = async user => await saveRecord('JournalEntry', plant)

export const getJournalById = async id => await getRecord('JournalEntry', id)

export const listJournals = async id => await getRecord('JournalEntry', id)

export const listJournalsFilter = async (userId, filters) =>
  await filterRecords('JournalEntry', userId, filters)

export const deleteJournalById = async id => await deleteRecord('JournalEntry', id)

export const updateJournalById = async (id, data) => await updateRecord('JournalEntry', id, data)
