import * as usersService from "../services/users.services.js"


export const getUsers = async (req, res) => {
  try {
    // Necesito un método que me permita obtener el listado de negocios
    const result = await usersService.getUsers()
    return res.send({ status: "success", payload: result})
  } catch (error) {
    return res.status(500).send({ status: "error", message: error.message })
  }
}

export const createUser = async (req, res) => {
  try {
    const user = req.body
    // Debería tener un método que me permita guardar el negocio
    const result = await usersService.createUser(user)
    return res.status(201).send({ status: "success", payload: result})
  } catch (error) {
    return res.status(500).send({ status: "error", message: error.message })
  }
}

