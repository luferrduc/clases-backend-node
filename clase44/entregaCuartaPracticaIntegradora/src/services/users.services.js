import { Users as UsersDao } from "../dao/factory.js"
import UsersRepository from "../repositories/users.repository.js"


const usersDao = new UsersDao()
const userRepository = new UsersRepository(usersDao)




export const changeRoleUser = async (uid) => {
  let result
  const user = await userRepository.getById(uid)
  if(!user) throw new UserNotFoundError("User not found, incorrect id")
  if(user.role === "user"){
    result = await userRepository.changeRole(uid, "premium")
  } else if (user.role === "premium"){
    result = await userRepository.changeRole(uid, "user")
  }
  
  return result

}