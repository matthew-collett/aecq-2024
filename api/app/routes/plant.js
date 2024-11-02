import express from 'express'

import {
  createPlant,
  getPlant,
  listPlants,
  updatePlant,
  deletePlant,
} from '../controllers/plantController.js'

import Roles from '#constants/roles.js'
import { authJWT } from '#middleware/authMiddleware.js'
import { authorizeRoles } from '#middleware/roleMiddleware.js'

const router = express.Router()

// POST /api/plant
router.post('/', createPlant)

// GET /api/plant
router.get('/', listPlants)

// GET /api/plant/:id
router.get('/:id', getPlant)

// PUT /api/plant/:id
router.put('/:id', updatePlant)

// DELETE /api/plant/:id
router.delete('/:id', deletePlant)

export default router
