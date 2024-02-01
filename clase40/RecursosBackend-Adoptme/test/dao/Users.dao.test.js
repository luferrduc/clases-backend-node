import mongoose from "mongoose"
import Users from "../../src/dao/Users.dao.js"
import { strict as assert } from "assert"

await mongoose.connect('mongodb+srv://lucianoferrando94:RxBWSWiQeU9Ic0Xy@cluster55575.ixldvmd.mongodb.net/clase40-testing?retryWrites=true&w=majority')

let usersDao

describe("Probando nuestro dao de usuarios", () => {
  before(() => {
    usersDao = new Users()
  })

  beforeEach( async () => {
    try {
      await mongoose.connection.collections?.users.drop()
    } catch (error) {
      console.log(error.message)
    }
  })
  // Definir todos nuestros escenarios de pruebas o pruebas unitarias
  it("El dao debe poder obtner todos los usuarios en formato de arreglo", async () => {
    const result = await usersDao.get()
    // Validar que el valor de result efectivamente es un arreglo
    assert.strictEqual(Array.isArray(result), true)
  })

  it("El dao debe agregar correctamente un elemento a la base de datos", async () => {
    const mockUser = {
      first_name: "Coder",
      last_name: "House",
      email: "ch@coder.com",
      password: "1234"
    }
    const result = await usersDao.save(mockUser)
    // Validar que el valor de result efectivamente es un arreglo
    assert.ok(result._id)

  })

  it("Al agregar un nuevo usuario este debe crearse con un arreglo de mascotas vacio por defecto", async () => {
    const mockUser = {
      first_name: "Jorge",
      last_name: "Gonzalez",
      email: "jgonzalez@coder.com",
      password: "abcd"
    }
    const result = await usersDao.save(mockUser)
    assert.deepStrictEqual(result.pets, [])
  })

  it("El Dao puede obtener a un usuario por email", async () => {
    const mockUser = {
      first_name: "Jorge",
      last_name: "Gonzalez",
      email: "jgonzalez@coder.com",
      password: "abcd"
    }
    const result = await usersDao.save(mockUser)
    const user = await usersDao.getBy({ email: mockUser.email })

    assert.strict(typeof user, 'object')
  })

})