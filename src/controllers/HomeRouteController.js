module.exports = class HomeRouteController {
	static async HomeGetController(req, res) {
		res.render("index");
	}
};
