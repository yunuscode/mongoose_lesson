const users = require("../models/UserModel");
const ads = require("../models/AdsModel");
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

		if (!category) {
			res.redirect("/");
			return 0;
		}

		const category_ads = await ads.find({
			category_id: id,
		});

		res.render("category", {
			user: req.user,
			category: category,
			category_ads,
		});
	}
};
