export default class CustomError {
  static createError({ name = "Error", cause, messagge, code = 1 }){
    let error = new Error(messagge, { cause })
    error.name = name
    error.code = code
    return error
  }
}