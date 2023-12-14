import * as businessService from "../services/business.services.js"


export const getBusiness = async (req, res) => {
  try {
    // Necesito un método que me permita obtener el listado de negocios
    const result = await businessService.getBusiness()
    return res.send({ status: "success", payload: result})
  } catch (error) {
    return res.status(500).send({ status: "error", message: error.message })
  }
}

export const createBusiness = async (req, res) => {
  try {
    const business = req.body
    // Debería tener un método que me permita guardar el negocio
    const result = await businessService.createBusiness(business)
    return res.status(201).send({ status: "success", payload: result})
  } catch (error) {
    return res.status(500).send({ status: "error", message: error.message })
  }
}