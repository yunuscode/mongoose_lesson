const users = require("../models/UserModel");
const { checkToken } = require("../modules/jwt");

module.exports = async function AuthMiddleware(req, res, next) {
	try {
		if (!req.cookies.token) {
			next();
			return;
		}
		const data = await checkToken(req.cookies.token);

		if (!data) {
			next();
			return;
		}

		const user = await users.findOne({
			_id: data.id,
		});

		req.user = user;

		next();
	} catch (error) {
		next();
	}
};
