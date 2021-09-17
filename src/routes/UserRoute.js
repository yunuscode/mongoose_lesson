const {
	UserRegistrationGetController,
} = require("../controllers/UserRouteController");

const router = require("express").Router();

router.get("/signup", UserRegistrationGetController);

module.exports = {
	path: "/users",
	router,
};
