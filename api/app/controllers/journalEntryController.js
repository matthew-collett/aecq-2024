import {
  getJournalById,
  updateJournalById,
  deleteJournalById,
  createJournal as createJournalService,
  listJournals as listJournalsService,
  listJournalsFilter as listJournalsFilterService,
} from '#services/journalEntryService.js'

export const createJournalEntry = async (req, res) => {
  try {
    const journalEntry = req.journal
    const journalData = req.body
    const journalEntry = await createJournalService(journalEntry)
    return res.status(201).json(journalEntry)
  } catch (error) {
    console.error('Error creating Journal Entry:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const listJournalEntries = async (req, res) => {
  try {
    const { field, value } = req.query
    const journalEntries = await listJournalsService(field, value)
    if (!journalEntries || journalEntries.length === 0) {
      return res.status(404).json({ message: 'No Journal Entries found' })
    }
    return res.status(200).json(journalEntries)
  } catch (error) {
    console.error('Error fetching Journal Entries:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const listJournalEntriesFilter = async (req, res) => {
  try {
    const userId = req.user?.id // Assuming user ID is attached to the request
    const filters = req.body.filters
    const filteredEntries = await listJournalsFilterService(userId, filters)
    if (!filteredEntries || filteredEntries.length === 0) {
      return res
        .status(404)
        .json({ message: 'No Journal Entries found with the specified filters' })
    }
    return res.status(200).json(filteredEntries)
  } catch (error) {
    console.error('Error fetching Journal Entries with filters:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const getJournalEntry = async (req, res) => {
  const { id } = req.params

  try {
    const journalEntry = await getJournalById(id)
    if (!journalEntry) {
      return res.status(404).json({ message: 'Journal Entry not found' })
    }
    return res.status(200).json(journalEntry)
  } catch (error) {
    console.error('Error retrieving Journal Entry:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const updateJournalEntry = async (req, res) => {
  const { id } = req.params
  const data = req.body

  try {
    const updatedJournalEntry = await updateJournalById(id, data)
    if (!updatedJournalEntry) {
      return res.status(404).json({ message: 'Journal Entry not found' })
    }
    return res.status(200).json(updatedJournalEntry)
  } catch (error) {
    console.error('Error updating Journal Entry:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const deleteJournalEntry = async (req, res) => {
  const { id } = req.params

  try {
    const deleted = await deleteJournalById(id)
    if (!deleted) {
      return res.status(404).json({ message: 'Journal Entry not found' })
    }
    return res.status(204).send()
  } catch (error) {
    console.error('Error deleting Journal Entry:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
