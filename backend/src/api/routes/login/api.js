const express = require("express");
const api = require("../../services/user/api");

const router = new express.Router();

/**
 */

router.post("/", async (req, res, next) => {
	const { email } = req.body;

	try {
		const result = await api.getUserByEmail(email);
		res.status(result.status || 200).send(result.data);
	} catch (err) {
		return res.status(err.status).send({
			status: err.status,
			error: err.error
		});
	}
});

module.exports = router;
