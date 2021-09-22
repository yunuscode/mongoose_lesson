const users = require("../models/UserModel");
const categories = require("../models/CategoryModel");
const { AddAdsValidation } = require("../modules/validations");
const path = require("path");

module.exports = class AdsRouteController {
	static async AdsAddGetController(req, res) {
		res.render("add_ads", {
			user: req.user,
			categories: await categories.find(),
		});
	}
	static async AdsAddPostController(req, res) {
		try {
			const { title, description, price } = await AddAdsValidation(
				req.body
			);

			let photos = [];

			if (Array.isArray(req.files.photos)) {
				req.files.photos.forEach((photo) => {
					const name = photo.md5 + ".jpg";
					photo.mv(
						path.join(__dirname, "..", "public", "uploads", name)
					);
					photos.push(name);
				});
			} else {
				const name = req.files.photos.md5 + ".jpg";
				req.files.photos.mv(
					path.join(__dirname, "..", "public", "uploads", name)
				);
				photos.push(name);
			}
		} catch (error) {
			res.render("add_ads", {
				user: req.user,
				categories: await categories.find(),
				error: error + "",
			});
		}
	}
};
