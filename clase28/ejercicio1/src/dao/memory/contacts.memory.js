import { v4 as uuidv4 } from "uuid"

export default class Contacts {
  constructor(){
    this.data = []
  }
  // CRUD

  // READ
  get = async () => {
    return this.data
  }
   // CREATE
   create = async (contact) => {
    contact._id = uuidv4()
    this.data.push(contact)
    return contact
  }
  // UPDATE
  update = async (id, contact) => {
    const index = this.data.findIndex( c => c._id === id)
    this.data[index] = contact
    return contact
  }
  // DELETE
  delete = async (id) => {
    const index = this.data.findIndex( c => c._id === id)
    this.data.splice(index, 1)
    return { id }
  }
}