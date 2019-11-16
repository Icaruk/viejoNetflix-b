
const mongoose = require("mongoose");


const TokenSchema = mongoose.Schema({
	
	clientId: {
		type: String
	}
	
});



const TokenModel = mongoose.model("token", TokenSchema);
module.exports = TokenModel;


