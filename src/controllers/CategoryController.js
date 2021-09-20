const users = require("../models/UserModel");
const categories = require("../models/CategoryModel");
const { isValidObjectId } = require("mongoose");

module.exports = class CategoryController {
	static async CategoryGetController(req, res) {
		const { id } = req.params;

		if (!isValidObjectId(id)) {
			res.redirect("/");
			return;
		}

		const category = await categories.findOne({
			_id: id,
		});

		res.render("category", {
			user: req.user,
			category: category,
		});
	}
};
