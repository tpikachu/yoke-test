const express = require("express");
const api = require("../../services/products/api");

const router = new express.Router();

/**
 *
 */

router.get("/", async (req, res, next) => {
	try {
		const result = await api.getAllProducts();
		res.status(result.status || 200).send(result.data);
	} catch (err) {
		return res.status(err.status).send({
			status: err.status,
			error: err.error
		});
	}
});


module.exports = router;
