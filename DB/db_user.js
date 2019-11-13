
const UserModel = require("../models/User");



const registerUser = (req, res) => {
	
	let bodyData = req.body;
	
	
	new UserModel ({
		
		username: 	bodyData.username,
		email: 		bodyData.email,
		password: 	bodyData.password,
		phone: 		bodyData.phone,
		address:	bodyData.address
		
	}).save().then( (user) => {
		res.send(user);
	}).catch( (err) => {
		console.log( err );
	});
	
};



const getAllUsers = (req, res) => {
	
	UserModel.find(
		{}
	).then ( (allUsers) => {
		res.send(allUsers);
	}).catch( (err) => {
		console.log( err );
	})	
	
};



const loginUser = (req, res) => {
	
	
	
};



const logoutUser = (req, res) => {
	
	
	
};



module.exports = {
	registerUser,
	getAllUsers,
	loginUser,
	logoutUser
};