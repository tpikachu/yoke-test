const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
// type
const Schema = mongoose.Schema;

// Define the model
const userSchema = new Schema(
	{
		name: String,
		email: String,
		password: String,
		balance: Number
	},
	{
		timestamps: true
	}
);

userSchema.pre("save", function(next) {
	// get access to user model, then we can use user.email, user.password
	const user = this;

	bcrypt.genSalt(10, function(err, salt) {
		if (err) {
			return next(err);
		}

		bcrypt.hash(user.password, salt, null, function(err, hash) {
			if (err) {
				return next(err);
			}

			user.password = hash;
			next();
		});
	});
});
userSchema.pre("updateOne", function(next) {
	// get access to user model, then we can use user.email, user.password

	const user = this._update;
	if (!user.password) next();
	bcrypt.genSalt(10, function(err, salt) {
		if (err) {
			return next(err);
		}

		bcrypt.hash(user.password, salt, null, function(err, hash) {
			if (err) {
				return next(err);
			}

			user.password = hash;
			next();
		});
	});
});

// Make use of methods for comparedPassword
userSchema.methods.comparedPassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, good) {
		if (err) {
			return cb(err);
		}
		cb(null, good);
	});
};

// Export the model
module.exports = mongoose.model("User", userSchema);
