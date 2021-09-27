const {
	MessagesGetController,
	MessagesPostController,
} = require("../controllers/MessagesController");
const AuthMiddleware = require("../middlewares/AuthMiddleware");

const router = require("express").Router();

router.get("/:id", AuthMiddleware, MessagesGetController);
// router.post("/:id", AuthMiddleware, MessagesPostController);

module.exports = {
	path: "/messages",
	router,
};
