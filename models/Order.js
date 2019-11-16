
const mongoose = require("mongoose");


const OrderSchema = mongoose.Schema({
	
	movieId: {
		type: Number
	},
	clientId: {
		type: String
	},
	startDate: {
		type: Array
	},
	endDate: {
		type: Array
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


