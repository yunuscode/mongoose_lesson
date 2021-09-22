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
		ref: "Category",
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Users",
	},
});

const ads = mongoose.model("ads", adsSchema);

module.exports = ads;
