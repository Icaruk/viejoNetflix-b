
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



const getUser = (req, res) => {
	
	let id = req.params.id;
	
	
	UserModel.findById(
		id
	).then ( (userData) => {
		res.send(userData);
	}).catch( (err) => {
		console.log( err );
	});
	
	
};



const deleteUser = (req, res) => {
	
	let id = req.params.id;
	
	
	UserModel.findByIdAndDelete(
		id
	).then ( (cadaver) => {
		
		if (cadaver) {
			res.send({
				message: `User ${cadaver.id} DELETED: username: ${cadaver.username} email: ${cadaver.email}`
			});
		} else {
			res.send({
				action: "deleteUser",
				error: `User with id ${id} not found.`
			})
		};
		
	}).catch( (err) => {
		console.log( err );
	});
	
	
};



const loginUser = (req, res) => {
	
	let usernameOrEmail = req.body.username; // puede ser username o email
	let password = req.body.password;
	
	
	// Pruebo a buscar por username
	UserModel.findOne({
		$and : [
			{$or : [
				{ username:  usernameOrEmail}, { email: usernameOrEmail }
			]},
			{ password: password }
		]
	}).then ( (userFound) => {
		
		// ¿User encontrado?
		if (!user) {
			
			res.send({
				error: "User not found or wrong password."
			});
			
		} else {
			
			res.send({
				token: user._id
			});
			
		};
		
	}).catch( (err) => {
		console.log( err );
	});	
	
};



const logoutUser = (req, res) => {
	
	// PENDIENTE
	
};



module.exports = {
	registerUser,
	getAllUsers,
	getUser,
	deleteUser,
	loginUser,
	logoutUser
};