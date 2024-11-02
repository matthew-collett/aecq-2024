import express from 'express'
import {
  createPlant,
  getPlant,
  listPlants,
  updatePlant,
  deletePlant,
} from '#controllers/plantController.js'

const router = express.Router()

// POST /api/plant
router.post('/', createPlant)

// GET /api/plant
router.get('/', listPlants)

// // POST /api/plant/filter - Filter plants by multiple criteria
// router.post('/filter', listPlantsFilter)

// GET /api/plant/:id
router.get('/:id', getPlant)

// PUT /api/plant/:id
router.put('/:id', updatePlant)

// DELETE /api/plant/:id
router.delete('/:id', deletePlant)

export default router
