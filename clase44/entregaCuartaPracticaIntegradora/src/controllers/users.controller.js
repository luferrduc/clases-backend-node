import { changeRoleUser as changeRoleUserServices } from "../services/users.services.js";

export const changeRoleUser = async (req, res) => {
	try {
		const { uid } = req.params;
		const result = await changeRoleUserServices(uid);

		return res.sendSuccess(result);
	} catch (error) {
		if (error instanceof UserNotFoundError) {
			req.logger.error(`${error.message}`);
			return res.sendClientError(error.message);
		} else {
			req.logger.fatal(`${error.message}`);
			return res.sendServerError(error.message);
		}
	}
};
