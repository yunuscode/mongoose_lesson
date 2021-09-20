const CategoryRoute = require("./CategoryRoute");
const HomeRoute = require("./HomeRoute");
const UserRoute = require("./UserRoute");

module.exports = (app) => {
	app.use(HomeRoute.path, HomeRoute.router);
	app.use(UserRoute.path, UserRoute.router);
	app.use(CategoryRoute.path, CategoryRoute.router);
};
