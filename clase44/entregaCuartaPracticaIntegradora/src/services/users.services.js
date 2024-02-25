import { Users as UsersDao } from "../dao/factory.js"
import UsersRepository from "../repositories/users.repository.js"
import { RequiredDocumentsNotFound } from "../utils/custom.exceptions.js"


const usersDao = new UsersDao()
const userRepository = new UsersRepository(usersDao)

const requiredDocuments = ["Identificación", "Comprobante de domicilio", "Comprobante de estado de cuenta"]


export const changeRoleUser = async (uid) => {
  let result

  const user = await userRepository.getById(uid)
  if(!user) throw new UserNotFoundError("User not found, incorrect id")

  //* Nueva condición: Solo si el usuario tiene subido
  //* los siguientes archivos: Identificación, Comprobante de domicilio, 
  //* Comprobante de estado de cuenta

  if(user.role === "user"){
    if(!user.documents.every( document => requiredDocuments.includes(document.name))){
      throw new RequiredDocumentsNotFound("No se tienen todos los documentos necesarios para cambiar a premium")
    }  
    result = await userRepository.changeRole(uid, "premium")
  } else if (user.role === "premium"){
    result = await userRepository.changeRole(uid, "user")
  }
  
  
  return result

}


export const uploadDocuments = async () => {
  
}