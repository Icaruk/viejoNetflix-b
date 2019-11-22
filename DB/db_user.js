
const UserModel = require("../models/User");
const TokenModel = require("../models/Token");
const bcrypt = require("bcryptjs");


const registerUser = (req, res) => {
	
	let bodyData = req.body;
	
	
	new UserModel ({
		
		username: 	bodyData.username,
		email: 		bodyData.email,
		password: 	bodyData.password,
		phone: 		bodyData.phone,
		address:	bodyData.address,
		billing:	bodyData.billing
		
	}).save().then( (user) => {
		
		let resLimpia = {
			userId: res._id,
			username: res.username,
			email: res.username
		};
		
		
		res.send(resLimpia);
		
		res.send(user);
		
	}).catch( (err) => {
		
		if (err.code === 11000) { // E11000 duplicate key error collection: viejoNetflix.users index: username_1 dup key: { : \"Icaruk\" }
			
			res.status(409); // conflict
			res.send({
				errorCode: "user_register_1",
				error: "User or email are already used."
			});
			
		} else {
			
			res.send(err);
			
		};
		
	});
	
};



const loginUser = async (req, res) => {
	
	try {
		
		let usernameOrEmail = req.body.username; // puede ser username o email
		let password = req.body.password;
		
		
		// Pruebo a buscar por username
		let userFound = await UserModel.findOne({
			$or : [
				{ username:  usernameOrEmail}, { email: usernameOrEmail }
			]
		});
		
		
		// ¿User encontrado?
		if (!userFound) {
			
			res.status(401);
			res.send({
				errorCode: "user_login_1",
				error: "User not found or wrong password."
			});
			
		} else {
			
			// Compruebo pass
			if (! bcrypt.compare(password, userFound.password)) {
				res.status(401);
				res.send({
					errorCode: "user_login_1",
					error: "User not found or wrong password."
				});
			};
			
			
			// Compruebo si ya está logeado
			let tokenFound = await TokenModel.findOne({
				userId: userFound._id
			});
			
			
			// Ya estaba logeado
			if (tokenFound) {
				
				res.status(403); // Forbidden
				res.send({
					errorCode: "user_login_2",
					error: "User is already logged in.",
					username: userFound.username,
					userId: tokenFound.userId,
					token: tokenFound._id
				});
				
			// No lo estaba
			} else {
				
				// Creo nuevo token
				let newToken = await new TokenModel ({
					userId: userFound._id,
					adminLevel: userFound.adminLevel
				}).save();
				
				
				// Lo envío de vuelta
				res.send({
					username: userFound.username,
					userId: userFound._id,
					token: newToken._id
				});
				
			};
			
		};
		
	} catch (err) {
		console.log( err );
	};
	
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
				errorCode: "user_logout_1",
				error: "Token not found."
			});
			
		};
		
	}).catch( (err) => {
		console.log( err );
	});
	
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



const getAllUsers = (req, res) => {
	
	UserModel.find(
		{}
	).then ( (allUsers) => {
		res.send(allUsers);
	}).catch( (err) => {
		console.log( err );
	})	
	
};



const deleteUser = (req, res) => {
	
	let id = req.params.id;
	// let token = req.query.token;
	
	
	// Busco si tiene un token activo, para borrarlo
	TokenModel.findOneAndRemove({
		userId: id
	}).catch( (err) => {
		console.log( err );
	})
	
	
	
	// Busco al usuario y lo borro
	UserModel.findByIdAndDelete(
		id
	).then ( (cadaver) => {
		
		if (cadaver) {
			res.send({
				message: `User ${cadaver.id} DELETED: username: ${cadaver.username} email: ${cadaver.email}`
			});
		} else {
			res.send({
				errorCode: "user_delete_1",
				error: `User with id ${id} not found.`
			})
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