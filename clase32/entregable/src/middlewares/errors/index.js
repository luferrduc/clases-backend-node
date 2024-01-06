import EnumErrors from "./enums.js";

export default (error, req, res, next)  => {
  switch (error.code){
    case EnumErrors.INVALID_TYPE_ERROR:
      return res.status(400).send({
        status: "error",
        error: error.name,
        description: error.cause
      })
    case EnumErrors.DATABASE_ERROR:
      return res.status(500).send({
        status: "error",
        error: error.name,
        description: error.cause
      }) 
    default:
      return res.status(500).send({
        status: "error",
        error: error.name,
        description: error.cause
      }) 
  }
  next()
}