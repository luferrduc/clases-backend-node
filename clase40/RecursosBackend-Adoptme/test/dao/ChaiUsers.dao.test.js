import mongoose from "mongoose"
import Users from "../../src/dao/Users.dao.js"
import { expect } from "chai"

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
    // assert.strictEqual(Array.isArray(result), true)
    expect(Array.isArray(result)).to.be.equal(true)
    expect(result).to.be.deep.equal([])
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
    // assert.ok(result._id)
    expect(result._id).to.be.ok

  })

  it("Al agregar un nuevo usuario este debe crearse con un arreglo de mascotas vacio por defecto", async () => {
    const mockUser = {
      first_name: "Jorge",
      last_name: "Gonzalez",
      email: "jgonzalez@coder.com",
      password: "abcd"
    }
    const result = await usersDao.save(mockUser)
    // assert.deepStrictEqual(result.pets, [])
    expect(result.pets).to.be.eql([])
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

    // assert.strict(typeof user, 'object')
    expect(typeof user).to.be.equal('object')
  })


  it("El Dao puede actualizar el usuario", async () => {
    // 1. Ingresar un usuario para actualizarlo posteriormente
    const mockUser = {
      first_name: "Jorge",
      last_name: "Gonzalez",
      email: "jgonzalez@coder.com",
      password: "abcd"
    }
    const resultSave = await usersDao.save(mockUser)

    // 2. Actualizar el usuario
    const mockUserUpdate = {
      first_name: "José",
      last_name: "Pérez",
      email: "jgonzalez@coder.com",
      password: "123456"
    }

    const resultUpdate = await usersDao.update(resultSave._id, mockUserUpdate)

    // 3. Obtener el usuario usando el método getBy
    const user = await usersDao.getBy({ email: mockUser.email })
    
    // assert.strict(typeof user, 'object')
    expect(user.first_name).to.be.equal('José')
    expect(user.last_name).to.be.equal('Pérez')
    expect(user.password).to.be.equal('123456')

  })

  it("El Dao puede eliminar el usuario", async () => {
    // 1. Ingresar un usuario para actualizarlo posteriormente

    const mockUser = {
      first_name: "Jorge",
      last_name: "Gonzalez",
      email: "jgonzalez@coder.com",
      password: "abcd"
    }

    const resultSave = await usersDao.save(mockUser)

    // 2. Eliminar el usuario
    await usersDao.delete(resultSave._id)

    const users = await usersDao.get()
   
    expect(users).to.be.deep.equal([])
  })

})