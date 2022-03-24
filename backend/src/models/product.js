const mongoose = require("mongoose");

// type
const Schema = mongoose.Schema;
// Define the model
const productSchema = new Schema(
	{
		productName: {
			type: String,
			unique: true
		},
		price: Number,
		quantity: Number,
	},
	{
		timestamps: true
	}
);

// Export the model
module.exports = mongoose.model("Product", productSchema);
