import express from 'express'
import {
  createJournalEntry,
  getJournalEntry,
  listJournalEntries,
  listJournalEntriesFilter,
  updateJournalEntry,
  deleteJournalEntry,
} from '#controllers/journalEntryController.js'

const router = express.Router()

// POST /api/journal
router.post('/', createJournalEntry)

// GET /api/journal
router.get('/', listJournalEntries)

// POST /api/journal/filter - Filter journal entries by multiple criteria
router.post('/filter', listJournalEntriesFilter)

// GET /api/journal/:id
router.get('/:id', getJournalEntry)

// PUT /api/journal/:id
router.put('/:id', updateJournalEntry)

// DELETE /api/journal/:id
router.delete('/:id', deleteJournalEntry)

export default router
