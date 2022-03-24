const User = require('../../../models/user');
const Receipt = require('../../../models/receipt');
const Product = require('../../../models/product');

/**
 * @param {Object} req.body
 * @throws {Error}
 * @return {Promise}
 */
module.exports.purchase = ( userId, productId) => {
	return new Promise(async (resolve, reject) => {
		try {
			const product = await Product.findById(productId);
			if (!product) {
				reject({ status: 400, error: "Cannot find product" })
				return;
			}
			const existingUser = await User.findById(userId);
			if (!existingUser) {
				reject({ status: 400, error: "Cannot find user" })
				return;
			}
			if (product.quantity === 0) {
				reject({ status: 400, error: "No quantity" })
				return;
			}
			if (existingUser.balance < product.quantity) {
				reject({ status: 400, error: "Insufficient balance" })
				return;
			}
			product.quantity -= 1;
			await product.save();
			
			const receipt = new Receipt({
				orderDate: new Date(),
				productId,
				userId,
				totalPrice: product.price,
				productName: product.productName
			});
			existingUser.updateOne({ balance: existingUser.balance - product.price })
				.then((updatedUser) => {
					receipt.save()
					.then((savedReceipt) => {
						resolve({
							status: 202,
							data: {
								updatedUser: {...updatedUser._doc},
								receipt: {...savedReceipt._doc}
							}
						});
					})
				});
		} catch (err) {
			reject({ status: 400, error: err });
		};
	});
};