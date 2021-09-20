const {
	UserRegistrationGetController,
	UserLoginGetController,
	UserSignUpPostController,
	UserVerifyGetController,
} = require("../controllers/UserRouteController");

const router = require("express").Router();

router.get("/signup", UserRegistrationGetController);
router.get("/login", UserLoginGetController);
router.get("/verify/:id", UserVerifyGetController);

router.post("/signup", UserSignUpPostController);

module.exports = {
	path: "/users",
	router,
};
