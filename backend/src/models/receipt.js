const mongoose = require('mongoose');
// type
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// Define the model
const receiptSchema = new Schema(
	{
		orderDate: Date,
		productID: {
			type: ObjectId,
			ref: 'Product'
		},
		userId: {
			type: ObjectId,
			ref: 'User'
		},
		productName: String,
		totalPrice: Number
	},
	{
		timestamps: true
	}
);
// Export the model
module.exports = mongoose.model('Receipt', receiptSchema);
