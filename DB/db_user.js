
const UserModel = require("../models/User");
const TokenModel = require("../models/Token");


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
	// let token = req.params.token;
	
	
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
	}).then ( (user) => {
		
		// ¿User encontrado?
		if (!user) {
			
			res.send({
				error: "User not found or wrong password."
			});
			
		} else {
			
			// Compruebo si ya está logeado
			TokenModel.findOne({
				clientId: user._id
			}).then( (tokenFound) => {
				
				// Ya estaba logeado
				if (tokenFound) {
					
					res.status(403); // Forbidden
					res.send({
						action: "userLogin",
						error: "User is already logged in."
					});
					
				// No lo estaba
				} else {
					
					// Creo token
					new TokenModel ({
						clientId: user._id
					}).save().then( (token) => {
						
						// Lo envío
						res.send({
							userId: user._id,
							token: token._id
						});
						
					}).catch( (err) => {
						console.log( err );
					});					
					
				};
				
			}).catch( (err) => {
				console.log( err );
			});
			
		};
		
	}).catch( (err) => {
		console.log( err );
	});	
	
};



const logoutUser = (req, res) => {
	
	let token = req.query.token;
	
	
	TokenModel.findByIdAndDelete(
		token
	).then( (cadaver) => {
		
		if (cadaver) {
			
			res.send({
				message: "Logged out."
			})
			
		} else {
			
			res.send({
				action: "logoutUser",
				error: "Token not found."
			});
			
		};
		
	}).catch( (err) => {
		console.log( err );
	});
	
};



module.exports = {
	registerUser,
	getAllUsers,
	getUser,
	deleteUser,
	loginUser,
	logoutUser
};