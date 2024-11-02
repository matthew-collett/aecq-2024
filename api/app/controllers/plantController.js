import { updatePlantSchema, plantSchema, listPlantsQuerySchema } from '#schemas/plants.js'
import {
  getPlantById,
  updatePlantById,
  deletePlantById,
  createNewPlant,
} from '#services/plantsService.js'
import { updateUserById } from '#services/usersService.js'

export const createPlant = async (req, res) => {
  const { error, value } = plantSchema.validate(req.body)
  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }

  try {
    const clazz = await createNewPlant(value)
    return res.status(201).json(clazz)
  } catch (error) {
    console.error('Error creating plant: ', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const listPlants = async (req, res) => {
  const { error, value } = listPlantsQuerySchema.validate(req.query, { stripUnknown: true })
  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }

  try {
    const plants = await listPlantsByIds(value)
    if (!plants) {
      return res.status(404).json({ message: 'No plants found' })
    }
    return res.status(200).json(plants)
  } catch (error) {
    console.error('Error fetching plants:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const getPlant = async (req, res) => {
  const { id } = req.params

  try {
    const clazz = await getPlantById(id)
    if (!clazz) {
      return res.status(404).json({ message: 'Plant not found' })
    }
    return res.status(200).json(clazz)
  } catch (error) {
    console.error('Error retrieving plant: ', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const updatePlant = async (req, res) => {
  const { id } = req.params

  const { error, value } = updateUserSchema.validate(req.body)
  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }

  try {
    const updatedPlant = await updatePlantById(id, value)
    if (!updatedPlant) {
      return res.status(404).json({ message: 'Plant not found' })
    }
    return res.status(200).json(updatedPlant)
  } catch (error) {
    console.error('Error updating plant: ', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const deletePlant = async (req, res) => {
  const { id } = req.params
  try {
    const deletedID = await deletePlantById(id)
    if (!deletedId) {
      return res.status(404).json({ message: 'Plant not found' })
    }

    return res.status(204).send()
  } catch (error) {
    console.error('Error deleting plant: ', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
