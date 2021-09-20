const users = require("../models/UserModel");
const categories = require("../models/CategoryModel");

module.exports = class HomeRouteController {
	static async HomeGetController(req, res) {
		res.render("index", {
			user: req.user,
			categories: await categories.find(),
		});
	}
};
