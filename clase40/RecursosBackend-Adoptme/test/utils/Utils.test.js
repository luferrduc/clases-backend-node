import { expect } from "chai";
import { createHash, passwordValidation } from "../../src/utils/index.js"


describe('Probando nuestro modulo de utils', () => {

  it("El servicio debe realizar un hasheo efectivo de la contraseña (debe corroborarse el resultado sea diferente a la original)", async () => {
    const password = "1234"
    const result = await createHash(password)

    expect(result).to.be.not.eql(password)

  })

  
  it("El hasheo realizado debe pdoer compararse de manera efectiva con la contraseña", async () => {
    const password = "1234"
    const user = {
      password: await createHash(password)
    }

    const result = await passwordValidation(user, password)

    expect(result).to.be.eql(true)

  })
})