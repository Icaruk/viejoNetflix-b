
const mongoose = require("mongoose");


const OrderSchema = mongoose.Schema({
	
	movieId: {
		type: Number
	},
	clientId: {
		type: Number
	},
	startDate: {
		type: Date
	},
	endDate: {
		type: Date
	},
	city: {
		type: String
	},
	completed: {
		type: Boolean
	}
	
});



const OrderModel = mongoose.model("order", OrderSchema);
module.exports = UserModel;


