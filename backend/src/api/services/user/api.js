const User = require("../../../models/user");
/**
 * @param {Object} req
 * @throws {Error}
 * @return {Promise}
 */
module.exports.getUser = async userId => {
	return new Promise((resolve, reject) => {
		User.findById(userId)
			.then(existingUser => {
				const doc = existingUser._doc;
				return resolve({
					status: 200,
					data: {
						name: doc.name,
						email: doc.email,
						balance: doc.balance
					}
				});
			})
			.catch(err => {
				reject({ status: 500, error: err });
			});
	});
};

module.exports.getUserByEmail = async email => {
	return new Promise((resolve, reject) => {
		User.findOne({ email })
			.then(existingUser => {
				const doc = existingUser._doc;
				return resolve({
					status: 200,
					data: {
						id: doc._id,
						name: doc.name,
						email: doc.email
					}
				});
			})
			.catch(err => {
				reject({ status: 500, error: err });
			});
	});
};
