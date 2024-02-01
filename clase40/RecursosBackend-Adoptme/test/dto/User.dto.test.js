import { expect } from "chai";
import UserDTO from "../../src/dto/User.dto.js"


describe('Probando nuestro DTO de Usuarios', () => {

  it("Corroborar que el DTO haga las transformaciones necesarias", async () => {
    const user = {
      first_name: "Coder",
      last_name: "House",
      password: "1234"
    }
    const result = UserDTO.getUserTokenFrom(user)
    expect(result.name).to.be.equal("Coder House")
    expect(result.first_name).to.be.undefined
    expect(result.last_name).to.be.undefined
    expect(result.password).to.be.undefined
  })

 
})