const users = require("../models/UserModel");

module.exports = class HomeRouteController {
	static async HomeGetController(req, res) {
		console.log(req.user);
		res.render("index", {
			user: req.user,
		});
	}
};
