import config from  "../config/config.js"

const persistence = config.persistence

let Contacts;

switch(persistence) {
  case 'MONGO':
    console.log('Trabajando con BD')
    // Imports dinámicos
    const mongoose = await import('mongoose')
    try {
      await mongoose.connect(config.mongoUrl)    
      const { default: ContactsMongo } = await import('./mongo/contacts.mongo.js')
      Contacts = ContactsMongo
    } catch (error) {
      console.log(error.message)
      mongoose.disconnect()
    }
    break
  case 'MEMORY':
    console.log("Trabajando con memoria")
    const { default: ContactsMemory } = await import('./memory/contacts.memory.js')
    Contacts = ContactsMemory
    break    
}


export { Contacts }