import { getUsersService, createUserService } from "../services/users.services.js"

export const getUsers = async (req, res) => {
  try {
    // Obtener el listado de usuarios
    const users = await getUsersService()
    return res.send({ status: "success", payload: users })
  } catch (error) {
    return res.status(500).send({ status: "error", message: error.message })
  }
}

export const createUser = async (req, res) => {
  try {
    const user = req.body
    const result = await createUserService(user)
    return res.send({ status: "success", payload: result })
  } catch (error) {
    return res.status(500).send({ status: "error", message: error.message })
  }
}