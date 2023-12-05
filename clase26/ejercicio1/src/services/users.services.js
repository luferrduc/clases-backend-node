import Users from "../dao/memoryManager/users.manager.js"

const usersManager = new Users()


export const getUserService = async () => {
  const users = await usersManager.getAll()
  return users
}

export const createUserService = async (user) => {
  const result = await usersManager.create(user)
  return result
} 