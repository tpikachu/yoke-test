const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const config = require("../lib/config");
const logger = require("../lib/logger");
const cors = require("cors");

const log = logger(config.logger);
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(cors());
/*
 * Routes
 */

app.use("/api/user", require("./routes/user/api"));
app.use("/api/products", require("./routes/products/api"));
app.use("/api/purchase", require("./routes/purchase/api"));
app.use("/api/receipts", require("./routes/receipts/api"));
app.use("/api/login", require("./routes/login/api"));

// catch 404
app.use("/", require("./routes/index"));
app.use((req, res, next) => {
	log.error(`Error 404 on ${req.url}.`);
	res.status(404).send({
		status: 404,
		error: "Not found"
	});
});

// catch errors
app.use((err, req, res, next) => {
	const status = err.status || 500;
	if (err.name === "UnauthorizedError") {
		res.status(401).send("invalid token...");
	} else {
		log.error(`Error ${status} (${err.message}) on ${req.method} ${req.url} with payload ${req.body}.`);
		res.status(status).send({
			status,
			error: "Server error"
		});
	}
});

module.exports = app;