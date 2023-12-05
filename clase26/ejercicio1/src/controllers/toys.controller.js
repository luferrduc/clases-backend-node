import { getToysService, createToyService } from "../services/users.services.js"

export const getToys = async (req, res) => {
  try {
    // Obtener el listado de usuarios
    const toys = await getToysService()
    return res.send({ status: "success", payload: users })
  } catch (error) {
    return res.status(500).send({ status: "error", message: error.message })
  }
}

export const createToy = async (req, res) => {
  try {
    const toy = req.body
    const result = await createToyService(toy)
    return res.send({ status: "success", payload: result })
  } catch (error) {
    return res.status(500).send({ status: "error", message: error.message })
  }
}