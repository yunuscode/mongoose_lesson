const users = require("../models/UserModel");
const ads = require("../models/AdsModel");
const categories = require("../models/CategoryModel");
const { AddAdsValidation } = require("../modules/validations");
const path = require("path");
const { default: slugify } = require("slugify");

module.exports = class AdsRouteController {
	static async AdsAddGetController(req, res) {
		res.render("add_ads", {
			user: req.user,
			categories: await categories.find(),
		});
	}
	static async AdsAddPostController(req, res) {
		try {
			const { title, description, price, category, phone } =
				await AddAdsValidation(req.body);

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

			const slug =
				slugify(title, {
					lower: true,
					strict: true,
					replacement: "_",
				}) + Date.now();

			let a = await ads.create({
				title,
				description,
				price,
				photos,
				phone,
				slug,
				category_id: category,
				owner_id: req.user._id,
			});

			res.redirect("/ads/" + slug);
		} catch (error) {
			res.render("add_ads", {
				user: req.user,
				categories: await categories.find(),
				error: error + "",
			});
		}
	}
	static async AdsOneGetController(req, res) {
		const adsOne = await ads
			.findOne({
				slug: req.params.slug,
			})
			.populate("owner_id")
			.populate("category_id");

		res.render("ads_page", {
			ads: adsOne,
			user: req.user,
		});
	}
};
