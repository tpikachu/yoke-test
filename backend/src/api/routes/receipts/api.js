const express = require("express");
const api = require("../../services/receipts/api");

const router = new express.Router();

/**
 */

router.get("/", async (req, res, next) => {
	const { userId } = req.query;

	try {
		const result = await api.getReceipts(userId);
		res.status(result.status || 200).send(result.data);
	} catch (err) {
		return res.status(err.status).send({
			status: err.status,
			error: err.error
		});
	}
});


module.exports = router;
