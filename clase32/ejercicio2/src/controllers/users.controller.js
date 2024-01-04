import CustomError from "../middlewares/errors/CustomError.js"
import EnumErrors from "../middlewares/errors/enums.js"


const saveUser = async (req, res) => {
  const { first_name, last_name, email } = req.body
  if(!first_name || !last_name || !email){
    throw CustomError.createError({
      name: "UserError",
      cause: "Invalid data types, first_name, last_name, email required",
      messagge: "Error trying to create user",
      code: EnumErrors.INVALID_TYPE_ERROR
    })
  }

  return res.send({
    status: "success",
    payload: {
      first_name,
      last_name,
      email
    }
  })
}

export default saveUser