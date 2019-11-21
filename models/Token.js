
const mongoose = require("mongoose");


const TokenSchema = mongoose.Schema({
	
	userId: {
		type: String
	},
	adminLevel: {
		type: Number,
		default: 0
	},
	endDate: {
		type: Date,
		default: () => Date.now() + 7 * 24 * 60 * 60 * 1000
	}
	
});



const TokenModel = mongoose.model("token", TokenSchema);
module.exports = TokenModel;


