const express = require("express");
const PORT = process.env.PORT || 8000;
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
const databaseMiddleware = require("./middlewares/databaseMiddleware");
const routes = require("./routes/routes");

async function server(mode) {
	const app = express();
	app.listen(PORT, (_) => console.log(`SERVER READY AT ${PORT}`));

	try {
		// middlewares
		app.use(express.json());
		app.use(express.urlencoded({ extended: true }));
		app.use(cookieParser());
		app.use(express.static(path.join(__dirname, "src", "public")));
		app.use(databaseMiddleware);

		if (mode == "DEV") {
			app.use(morgan("dev"));
		}

		// settings
		app.set("view engine", "ejs");
	} finally {
		routes(app);
	}
}

module.exports = server;
