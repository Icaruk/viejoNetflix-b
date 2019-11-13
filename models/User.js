
const mongoose = require("mongoose");


const UserSchema = mongoose.Schema({
	
	username: {
		type: String,
		unique: true,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: String,
	phone: {
		type: String,
		unique: true,
		required: true
	},
	address: {
		type: String,
		unique: true,
		required: true
	},
	billing: {
		type: Object,
		required: false,
		
		cardNumber: {
			type: Number,
			required: true
		},
		cardOwner: {
			type: Number,
			required: true
		},
		cardExpireDate: {
			type: Date,
			required: true
		}
	}
	
});



const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;


