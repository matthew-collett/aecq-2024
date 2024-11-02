import {
  getPlantById,
  updatePlantById,
  deletePlantById,
  createPlant as createPlantService,
  listPlants as listPlantsService,
  deletePlants as deletePlantsService,
} from '#services/plantService.js'

export const createPlant = async (req, res) => {
  try {
    const plant = await createPlantService(req.body)
    return res.status(201).json(plant)
  } catch (error) {
    console.error('Error creating plant: ', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const listPlants = async (req, res) => {
  try {
    const plants = await listPlantsService()
    return res.status(200).json(plants)
  } catch (error) {
    console.error('Error fetching plants:', error)
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

export const deletePlants = async (req, res) => {
  try {
    const deleted = await deletePlantsService()
    if (!deleted) {
      return res.status(404).json({ message: 'Plants not found' })
    }
    return res.status(204).send()
  } catch (error) {
    console.error('Error deleting plant: ', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
