import {
  updateJournalEntrySchema,
  journalEntrySchema,
  listJournalEntrysQuerySchema,
} from '#schemas/journalEntrys.js'
import {
  getJournalEntryById,
  updateJournalEntryById,
  deleteJournalEntryById,
  createNewJournalEntry,
} from '#services/journalEntryService.js'
import { updateUserById } from '#services/usersService.js'

export const createJournalEntry = async (req, res) => {
  const { error, value } = journalEntrySchema.validate(req.body)
  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }

  try {
    const clazz = await createNewJournalEntry(value)
    return res.status(201).json(clazz)
  } catch (error) {
    console.error('Error creating Journal Entry: ', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const listJournalEntrys = async (req, res) => {
  const { error, value } = listJournalEntrysQuerySchema.validate(req.query, { stripUnknown: true })
  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }

  try {
    const journalEntrys = await listJournalEntrysByIds(value)
    if (!journalEntrys) {
      return res.status(404).json({ message: 'No Journal Entrys found' })
    }
    return res.status(200).json(journalEntrys)
  } catch (error) {
    console.error('Error fetching Journal Entries:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const getJournalEntry = async (req, res) => {
  const { id } = req.params

  try {
    const clazz = await getJournalEntryById(id)
    if (!clazz) {
      return res.status(404).json({ message: 'Journal Entry not found' })
    }
    return res.status(200).json(clazz)
  } catch (error) {
    console.error('Error retrieving Journal Entry: ', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const updateJournalEntry = async (req, res) => {
  const { id } = req.params

  const { error, value } = updateUserSchema.validate(req.body)
  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }

  try {
    const updatedJournalEntry = await updateJournalEntryById(id, value)
    if (!updatedJournalEntry) {
      return res.status(404).json({ message: 'Journal Entry not found' })
    }
    return res.status(200).json(updatedJournalEntry)
  } catch (error) {
    console.error('Error updating Journal Entry: ', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const deleteJournalEntry = async (req, res) => {
  const { id } = req.params
  try {
    const deletedID = await deleteJournalEntryById(id)
    if (!deletedId) {
      return res.status(404).json({ message: 'Journal Entry not found' })
    }

    return res.status(204).send()
  } catch (error) {
    console.error('Error deleting Journal Entry: ', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
