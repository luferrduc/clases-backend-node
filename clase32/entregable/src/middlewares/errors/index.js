import EnumErrors from "./enums.js";

export default (error, req, res, next) => {
	switch (error.code) {
		case EnumErrors.INVALID_TYPE_ERROR:
			res.status(400).send({
				status: "error",
				error: error.name,
				description: error.cause
			});
		case EnumErrors.INVALID_CREDENTIALS:
			res.status(401).send({
				status: "error",
				error: error.name,
				description: error.cause
			});
		case EnumErrors.NOT_PERMISSIONS:
			res.status(403).send({
				status: "error",
				error: error.name,
				description: error.cause
			});
		case EnumErrors.DATABASE_ERROR:
			res.status(500).send({
				status: "error",
				error: error.name,
				description: error.cause
			});
		default:
			res.status(500).send({
				status: "error",
				error: error.name,
				description: error.cause
			});
	}
	next();
};
