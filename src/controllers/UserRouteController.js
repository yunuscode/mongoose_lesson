const users = require("../models/UserModel");
const { SignUpValidation } = require("../modules/validations");
const { generateHash } = require("../modules/bcrypt");
const { email: sendEmail } = require("../modules/email");

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

			await sendEmail(
				email,
				"Iltimos pochtangizni tasdiqlang",
				`Pochtangizni tasdiqlash uchun link`,
				`<a href="http://localhost:8000/users/verify/${user._id}"/>Tasdiqlash</a>`
			);

			res.redirect("/login");
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
		} catch (error) {
			res.render("login", {
				error: error + "",
			});
		}
	}
};
