import config from '#config'
import {
  getUserById,
  updateUserById,
  deleteUserById,
} from '#services/usersService.js'


export const getUser = async (req, res) => {
  const { id } = req.params
  try {
    const user = await getUserById(id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    return res.status(200).json(user)
  } catch (error) {
    console.error('Error retrieving user: ', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const updateUser = async (req, res) => {
  const { id } = req.params

  const { error, value } = updateUserSchema.validate(req.body)
  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }

  try {
    const updatedUser = await updateUserById(id, value)
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' })
    }
    return res.status(200).json(updatedUser)
  } catch (error) {
    console.error('Error updating user: ', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const deleteUser = async (req, res) => {
  const { id } = req.params
  try {
    const deletedID = await deleteUserById(id)
    if (!deletedId) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res.status(204).send()
  } catch (error) {
    console.error('Error deleting user: ', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
