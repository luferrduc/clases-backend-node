import UsersRepository from "../repositories/users.repository.js"

const usersRepository = new UsersRepository()

export const getUsers = async () => {
  const result = await usersRepository.getUsers()
  return result
}

export const getUserById = async (id) => {
  const result = await usersRepository.getUserById(id)
  return result
}

export const createUser = async (user) => {
  const result = await usersRepository.createUser(user)
  return result
}

export const updateUser = async (id, user) => {
  const result = await usersRepository.updateUser(id, user)
  return result
}

