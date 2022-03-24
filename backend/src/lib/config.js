const path = require("path");
const dotenv = require("dotenv");
const yaml_config = require("node-yaml-config");

const config = yaml_config.load(path.join(__dirname, "../../config/common.yml"));
module.exports = config;

if (process.env.NODE_ENV === "development") {
	dotenv.config({ path: path.resolve(__dirname, "../../.env.development") });
} else if (process.env.NODE_ENV === "production") {
	dotenv.config({ path: path.resolve(__dirname, "../../.env") });
}
