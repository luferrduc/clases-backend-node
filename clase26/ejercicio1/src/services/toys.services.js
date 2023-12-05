import Toys from "../dao/memoryManager/toys.manager.js"

const toysManager = new Toys()


export const getToyService = async () => {
  // Requerimos ordenar los juguetes de mayor a menor según el precio
  // Obtengo la data de la BBDD -> persistencia
  const toys = await toysManager.getAll()
  // Tengo lista la data
  // Debería implementar el algoritmo que me permita ordenar de acuerdo al precio
  // logica
  // más lógica
  return toys
}

export const createToyService = async (toy) => {
  const result = await toysManager.create(toy)
  return result
} 