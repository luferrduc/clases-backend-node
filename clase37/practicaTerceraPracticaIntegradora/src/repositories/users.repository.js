// Tenemos accesos a nuestros datos a nivel de BD, es que en esta capa podemos
// aplciar transformaciones de nuestros datos. Podemos aplciar nuestro patrón DTO

export default class UsersRepository {
  constructor(dao){
    this.dao = dao
  }
  getByEmail = async (email) => {
    const user = await this.dao.getByEmail(email)
    return user
  }
  save = async (user) => {
    const result = await this.dao.save(user)
    return result
  }
}