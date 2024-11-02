import {
  getPlantById,
  updatePlantById,
  deletePlantById,
  createPlant as createPlantService,
  listPlants as listPlantsService,
  listPlantsFilter as listPlantsFilterService,
} from '#services/plantsService.js'

export const createPlant = async (req, res) => {
  try {
    const user = req.user // Assuming user is attached to the request
    const plantData = req.body
    const plant = await createPlantService(user, plantData)
    return res.status(201).json(plant)
  } catch (error) {
    console.error('Error creating plant: ', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const listPlants = async (req, res) => {
  try {
    const { field, value } = req.query
    const plants = await listPlantsService(field, value)
    if (!plants) {
      return res.status(404).json({ message: 'No plants found' })
    }
    return res.status(200).json(plants)
  } catch (error) {
    console.error('Error fetching plants:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const listPlantsFilter = async (req, res) => {
  try {
    const userId = req.user?.id // Assuming user ID is attached to the request
    const filters = req.body.filters
    const filteredPlants = await listPlantsFilterService(userId, filters)
    if (!filteredPlants || filteredPlants.length === 0) {
      return res.status(404).json({ message: 'No plants found with the specified filters' })
    }
    return res.status(200).json(filteredPlants)
  } catch (error) {
    console.error('Error fetching plants with filters:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const getPlant = async (req, res) => {
  const { id } = req.params

  try {
    const plant = await getPlantById(id)
    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' })
    }
    return res.status(200).json(plant)
  } catch (error) {
    console.error('Error retrieving plant: ', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const updatePlant = async (req, res) => {
  const { id } = req.params
  const data = req.body

  try {
    const updatedPlant = await updatePlantById(id, data)
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
    const deleted = await deletePlantById(id)
    if (!deleted) {
      return res.status(404).json({ message: 'Plant not found' })
    }
    return res.status(204).send()
  } catch (error) {
    console.error('Error deleting plant: ', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
