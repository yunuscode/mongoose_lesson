const { ChatGetController } = require("../controllers/ChatController");
const AuthMiddleware = require("../middlewares/AuthMiddleware");

const router = require("express").Router();

router.use(AuthMiddleware);

router.get("/", ChatGetController);

module.exports = {
	path: "/chat",
	router,
};
