const express = require('express');
const api = require('../../services/purchase/api');

const router = new express.Router();

router.post('/', async (req, res, next) => {
	try {
		const { userId, productId } = req.body;		
		const result = await api.purchase(userId, productId);
		res.status(result.status || 200).send(result.data);
	} catch (err) {
		console.log(err)
		return res.status(err.status).send({
			status: err.status,
			error: err.error
		});
	}
});

module.exports = router;
