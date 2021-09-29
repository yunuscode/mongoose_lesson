const AdsRoute = require("./AdsRoute");
const CategoryRoute = require("./CategoryRoute");
const ChatRoute = require("./ChatRoute");
const HomeRoute = require("./HomeRoute");
const MessagesRoute = require("./MessagesRoute");
const UserRoute = require("./UserRoute");

module.exports = (app) => {
	app.use(HomeRoute.path, HomeRoute.router);
	app.use(UserRoute.path, UserRoute.router);
	app.use(CategoryRoute.path, CategoryRoute.router);
	app.use(AdsRoute.path, AdsRoute.router);
	app.use(MessagesRoute.path, MessagesRoute.router);
	app.use(ChatRoute.path, ChatRoute.router);
};
