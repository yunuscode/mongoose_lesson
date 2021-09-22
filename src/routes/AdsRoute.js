const fileUpload = require("express-fileupload");
const {
	AdsAddGetController,
	AdsAddPostController,
} = require("../controllers/AdsController");

const router = require("express").Router();

const fileUploadForAds = fileUpload({
	safeFileNames: true,
});

router.get("/add", AdsAddGetController);
router.post("/add", fileUploadForAds, AdsAddPostController);

module.exports = {
	path: "/ads",
	router,
};
