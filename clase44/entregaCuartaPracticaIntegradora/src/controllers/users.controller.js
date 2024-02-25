import { changeRoleUser as changeRoleUserServices } from "../services/users.services.js";
import { RequiredDocumentsNotFound } from "../utils/custom.exceptions.js";

export const changeRoleUser = async (req, res) => {
	try {
		const { uid } = req.params;
		const result = await changeRoleUserServices(uid);

		return res.sendSuccess(result);
	} catch (error) {
		if (error instanceof UserNotFoundError) {
			req.logger.error(`${error.message}`);
			return res.sendClientError(error.message);
		} else if (error instanceof RequiredDocumentsNotFound){
			req.logger.error(`${error.message}`);
			return res.sendUnproccesableEntity(error.message);
		} 
		else {
			req.logger.fatal(`${error.message}`);
			return res.sendServerError(error.message);
		}
	}
};
