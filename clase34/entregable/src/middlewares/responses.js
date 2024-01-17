import CustomError from "../middlewares/errors/CustomError.js"
import EnumErrors from "../middlewares/errors/enums.js"

export const generateCustomResponse = (req, res, next) => {
  res.sendSuccess = (data) => {
    return res.status(200).json({ status: "success", payload: data });
  };
  res.sendSuccessNewResource = (data) => {
    return res.status(201).json({ status: "success", ...data });
  };
  res.sendClientError = ({name = "Error", cause, messagge, code = 7}) => {
    return res.status(400).json({ status: "error", message: error });
  };
  res.sendAuthError = ([name = "Error", cause, messagge, code = 7]) => {
    return res.status(401).json({ status: "error", message: error });
  };
  res.sendPermissionsError = ({name = "Error", cause, messagge, code = 7}) => {
    return res.status(403).json({ status: "error", message: error });
  };
  res.sendNotFoundError = ({name = "Error", cause, messagge, code = 7}) => {
    throw CustomError.createError({name,cause,messagge,code })
    return res.status(404).json({ status: "error", message: error });
  }
  res.sendUnproccesableEntity = ({name = "Error", cause, messagge, code = 7}) => {
    return res.status(422).json({ status: "error", message: error })
  }
  res.sendServerError = ({name = "Error", cause, messagge, code = 7}) => {
    return res.status(500).json({ status: "error", message: error });
  };
  next();
};
