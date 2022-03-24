const Product = require("../../../models/product");

/**
 * @param {}
 * @throws {Error}
 * @return {Promise}
 */
module.exports.getAllProducts = async () => {
	return new Promise((resolve, reject) => {
		Product.find()
			.then(products => {
				return resolve({
					status: 200,
					data: products
				});
			})
			.catch(err => {
				reject({ status: 500, error: err });
			});
	});
};
