const {
	UserRegistrationGetController,
	UserLoginGetController,
	UserSignUpPostController,
	UserVerifyGetController,
	UserExitGetController,
	UserLoginPostController,
	UserProfileGetController,
} = require("../controllers/UserRouteController");
const AuthMiddleware = require("../middlewares/AuthMiddleware");

const router = require("express").Router();

router.get("/signup", UserRegistrationGetController);
router.get("/login", UserLoginGetController);
router.get("/verify/:id", UserVerifyGetController);
router.get("/exit", UserExitGetController);
router.get("/profile", AuthMiddleware, UserProfileGetController);

router.post("/signup", UserSignUpPostController);
router.post("/login", UserLoginPostController);

module.exports = {
	path: "/users",
	router,
};
