import ContactsDto from "../DTOs/contacts.dto.js";

export default class ContactsRepository {
  constructor(dao){
    this.dao = dao
  }
  getContacts = async () => {
    const result = await this.dao.get()
    return result
  }

  createContact = async (contact) => {
    const contactToInsert = new ContactsDto(contact)
    const result = await this.dao.create(contactToInsert)
    return result 
  }

}

// Capa de repositorios está centrada en manejar objetos 
// a nivel del Dominio

// {
//   name: "asdad",
//   phone: "213123"
// }

// Capa de acceso a los datos o nuestros daos, está centrada en manejar objetos directos
// {
//   name: String,
//   phone: String,
//   // Campos de auditoria
//   // created_at,
//   // updated_at,
//   // deleted_at 
// }