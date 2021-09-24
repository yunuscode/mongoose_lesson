const {
	UserRegistrationGetController,
	UserLoginGetController,
	UserSignUpPostController,
	UserVerifyGetController,
	UserExitGetController,
	UserLoginPostController,
	UserProfileGetController,
	UserSessionsGetController,
	UserSessionDeleteController,
} = require("../controllers/UserRouteController");
const AuthMiddleware = require("../middlewares/AuthMiddleware");

const router = require("express").Router();

router.get("/signup", UserRegistrationGetController);
router.get("/login", UserLoginGetController);
router.get("/verify/:id", UserVerifyGetController);
router.get("/exit", UserExitGetController);
router.get("/sessions", AuthMiddleware, UserSessionsGetController);
router.get("/sessions/delete/:id", AuthMiddleware, UserSessionDeleteController);

router.get("/:id", AuthMiddleware, UserProfileGetController);

router.post("/signup", UserSignUpPostController);
router.post("/login", UserLoginPostController);

module.exports = {
	path: "/users",
	router,
};
