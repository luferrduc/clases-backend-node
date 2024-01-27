import { Users as UsersDao } from "../dao/factory.js"
import UsersRepository from "../repositories/users.repository.js"


const usersDao = new UsersDao()
const userRepository = new UsersRepository(usersDao)
