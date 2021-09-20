const JWT = require("jsonwebtoken");

module.exports.createToken = async function createToken(data) {
	return JWT.sign(data, process.env.JWT_SECRET);
};

module.exports.checkToken = async function checkToken(token) {
	try {
		return await JWT.verify(token, process.env.JWT_SECRET);
	} catch (error) {
		return false;
	}
};
