import BusinessRepository from "../repositories/business.repository.js"

const businessRepository = new BusinessRepository()

export const getBusiness = async () => {
  const result = await businessRepository.getBusiness()
	// Lógica de negocio
	// Implementar el algoritmo que me permita ordenar los negocios
	// de acuerdo a la distancia
  return result
}

export const getBusinessById = async (id) => {
  const result = await businessRepository.getBusinessById(id)
  return result
}

export const createBusiness = async (business) => {
  const result = await businessRepository.createBusiness(business)
  return result
}

