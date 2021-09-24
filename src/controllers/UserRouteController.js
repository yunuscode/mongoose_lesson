const users = require("../models/UserModel");
const ads = require("../models/AdsModel");
const { SignUpValidation, LoginValidation } = require("../modules/validations");
const { generateHash, compareHash } = require("../modules/bcrypt");
const { email: sendEmail } = require("../modules/email");
const { createToken } = require("../modules/jwt");
const { isValidObjectId } = require("mongoose");
const sessions = require("../models/SessionsModel");

module.exports = class UserRouteController {
	static async UserRegistrationGetController(req, res) {
		res.render("registration");
	}
	static async UserLoginGetController(req, res) {
		res.render("login");
	}
	static async UserSignUpPostController(req, res) {
		try {
			const { name, email, password } = await SignUpValidation(req.body);

			const user = await users.create({
				name,
				email,
				password: await generateHash(password),
			});

			// await sendEmail(
			// 	email,
			// 	"Iltimos pochtangizni tasdiqlang",
			// 	`Pochtangizni tasdiqlash uchun link`,
			// 	`<a href="http://localhost:8000/users/verify/${user._id}"/>Tasdiqlash</a>`
			// );

			console.log(`http://10.10.129.48:8000/users/verify/${user._id}`);

			res.redirect("/users/login");
		} catch (error) {
			console.log(error);
			res.render("registration", {
				error: error + "",
			});
		}
	}
	static async UserVerifyGetController(req, res) {
		try {
			const id = req.params.id;

			if (!id) throw new Error("Verification kalit xato)");

			if (!isValidObjectId(id))
				throw new Error("Verification kalit xato)");

			const user = await users.findOne({
				_id: id,
			});

			if (!user) throw new Error("Verification kalit xato)");

			let x = await users.updateOne(
				{
					_id: id,
				},
				{
					isVerified: true,
				}
			);

			res.cookie(
				"token",
				await createToken({
					id: user._id,
				})
			).redirect("/");
		} catch (error) {
			res.render("login", {
				error: error + "",
			});
		}
	}
	static async UserLoginPostController(req, res) {
		try {
			const { email, password } = await LoginValidation(req.body);

			const user = await users.findOne({
				email: email,
			});

			if (!user) throw new Error("User topilmadi");

			if (!(await compareHash(password, user.password)))
				throw new Error("Parol xato");

			await sessions.deleteMany({
				owner_id: user._id,
				user_agent: req.headers["user-agent"],
			});

			const session = await sessions.create({
				owner_id: user._id,
				user_agent: req.headers["user-agent"],
			});

			res.cookie(
				"token",
				await createToken({
					session_id: session._id,
				})
			).redirect("/");
		} catch (error) {
			res.render("login", {
				error: error + "",
			});
		}
	}

	static async UserExitGetController(req, res) {
		res.clearCookie("token").redirect("/");
	}
	static async UserProfileGetController(req, res) {
		const valid = isValidObjectId(req.params?.id);

		if (!valid) {
			res.redirect("/");
			return 0;
		}

		const user = await users.findById(req.params?.id);

		if (!user) {
			res.redirect("/");
			return 0;
		}

		const user_ads = await ads.find({
			owner_id: user._id,
		});

		res.render("profile", {
			user: req.user,
			profile: user,
			isOwnProfile: req.user._id.equals(user._id),
			user_ads,
		});
	}

	static async UserSessionsGetController(req, res) {
		try {
			const user_sessions = await sessions.find({
				owner_id: req.user._id,
			});

			res.render("sessions", {
				user: req.user,
				user_sessions,
			});
		} catch (error) {
			console.log(error);
			res.redirect("/");
		}
	}

	static async UserSessionDeleteController(req, res) {
		try {
			const session_id = isValidObjectId(req.params?.id);

			if (!session_id) throw new Error("Session id is invalid");

			let x = await sessions.deleteOne({
				owner_id: req.user._id,
				_id: req.params?.id,
			});

			res.redirect("/users/sessions");
		} catch (error) {
			console.log(error);
			res.redirect("/users/sessions");
		}
	}
};
