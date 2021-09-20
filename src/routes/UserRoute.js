const {
	UserRegistrationGetController,
	UserLoginGetController,
	UserSignUpPostController,
	UserVerifyGetController,
	UserExitGetController,
	UserLoginPostController,
} = require("../controllers/UserRouteController");

const router = require("express").Router();

router.get("/signup", UserRegistrationGetController);
router.get("/login", UserLoginGetController);
router.get("/verify/:id", UserVerifyGetController);
router.get("/exit", UserExitGetController);

router.post("/signup", UserSignUpPostController);
router.post("/login", UserLoginPostController);

module.exports = {
	path: "/users",
	router,
};
