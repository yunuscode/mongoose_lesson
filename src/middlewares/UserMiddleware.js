const sessions = require("../models/SessionsModel");
const users = require("../models/UserModel");
const { checkToken } = require("../modules/jwt");

module.exports = async function UserMiddleware(req, res, next) {
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

		const session = await sessions
			.findOne({
				_id: data.session_id,
			})
			.populate("owner_id");

		if (!session) {
			next();
			return;
		}

		req.user = session.owner_id;

		next();
	} catch (error) {
		next();
	}
};
