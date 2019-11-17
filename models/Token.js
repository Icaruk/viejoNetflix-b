
const mongoose = require("mongoose");


const TokenSchema = mongoose.Schema({
	
	userId: {
		type: String
	},
	adminLevel: {
		type: Number,
		default: 0
	}
	
});



const TokenModel = mongoose.model("token", TokenSchema);
module.exports = TokenModel;


