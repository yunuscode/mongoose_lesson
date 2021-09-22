const mongoose = require("mongoose");

const adsSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
		min: 0,
	},
	phone: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	photos: [String],
	category_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "categories",
	},
	owner_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users",
	},
	slug: {
		type: String,
		required: true,
		unique: true,
	},
});

const ads = mongoose.model("ads", adsSchema);

module.exports = ads;
