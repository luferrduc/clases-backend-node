import { Router } from "express";
// import Contacts from "../dao/mongo/contacts.mongo.js";
// import Contacts from "../dao/memory/contacts.memory.js";
import { Contacts } from "../dao/factory.js";
import ContactsDto from "../DTOs/contacts.dto.js";
import ContactsRepository from "../repositories/contacts.repository.js";

const router = Router()
const contactsDao = new Contacts()
const contactsRepository = new ContactsRepository(contactsDao)


router.get("/", async (req, res) => {
  const data = await contactsRepository.getContacts()
  return res.json(data)
})
.post("/", async (req, res) => {
  const { name, phone, lastname } = req.body
  // Aplico patron DTO
  // {name, phone, lastname} -> {name: name lastname, phone}

  // DTO
  // const contact = new ContactsDto({name, lastname, phone})
  // const data = await contactsDao.create(contact)
  const data = await ContactsRepository.createContact({name, lastname, phone})
  return res.json(data)
})


export default router