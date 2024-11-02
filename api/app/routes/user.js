import express from 'express'
import { createUser, getUser, updateUser, deleteUser } from '#controllers/userController.js'

const router = express.Router()

// POST /api/user
router.post('/', createUser)

// GET /api/user/:id
router.get('/:id', getUser)

// PUT /api/user/:id
router.put('/:id', updateUser)

// DELETE /api/user/:id
router.delete('/:id', deleteUser)

export default router
