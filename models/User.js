
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
		unique: false,
		required: true
	},
	address: {
		type: String,
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
			type: String,
			required: true
		},
		cardExpireDate: {
			type: Array,
			required: true
		}
	},
	adminLevel: {
		type: Number,
		default: 0
	}
	
});



const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;


