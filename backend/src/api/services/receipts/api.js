const Receipt = require("../../../models/receipt");
/**
 * @param {Object} req
 * @throws {Error}
 * @return {Promise}
 */
module.exports.getReceipts = async userId => {
	return new Promise((resolve, reject) => {
		Receipt.find({userId})
			.then(receipts => {
				return resolve({
					status: 200,
					data: receipts
				});
			})
			.catch(err => {
				reject({ status: 500, error: err });
			});
	});
};