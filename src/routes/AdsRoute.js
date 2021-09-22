const fileUpload = require("express-fileupload");
const {
	AdsAddGetController,
	AdsAddPostController,
	AdsOneGetController,
} = require("../controllers/AdsController");

const router = require("express").Router();

const fileUploadForAds = fileUpload({
	safeFileNames: true,
});

router.get("/add", AdsAddGetController);
router.post("/add", fileUploadForAds, AdsAddPostController);
router.get("/:slug", AdsOneGetController);

module.exports = {
	path: "/ads",
	router,
};
