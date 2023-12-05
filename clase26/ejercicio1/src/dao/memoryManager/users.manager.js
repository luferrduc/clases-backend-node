

export default class Users {
  constructor(){
    this.data = []
  }

  async getAll(){
    return this.data
  }

  async create(user){
    this.data.push(user)
    return user
  }

}