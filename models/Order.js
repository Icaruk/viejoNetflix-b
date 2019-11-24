
const mongoose = require("mongoose");


const OrderSchema = mongoose.Schema({
	
	movieId: {
		type: Number
	},
	userId: {
		type: String
	},
	startDate: {
		type: Date
		// default: () => Date.now()
	},
	endDate: {
		type: Date
		// default: () => Date.now() + 2 * 24 * 60 * 60 * 1000
	},
	city: {
		type: String
	},
	status: {
		type: Number
	}
	
});



const OrderModel = mongoose.model("order", OrderSchema);
module.exports = OrderModel;


