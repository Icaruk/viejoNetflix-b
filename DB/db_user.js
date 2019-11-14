
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
		res.send(`User ${cadaver.id} DELETED: username: ${cadaver.username} email: ${cadaver.email}`);
	}).catch( (err) => {
		console.log( err );
	});
	
	
};



const loginUser = (req, res) => {
	
	let username = req.body.username; // puede ser username o email
	let password = req.body.password;
	
	
	// Pruebo a buscar por username
	UserModel.find({
		username: username
	}).then ( (usersFound) => {
		
		if (usersFound.length > 0) { // lo he encontrado por usuario
			
			returnLoginUser(password, res, usersFound);
			
		} else { // no lo he encontrado, pruebo por email
			
			UserModel.find({
				email: username
			})
			.then( (usersFound) => {
				returnLoginUser(password, res, usersFound);
			})
			.catch( err => console.log(err) );
			
		};
		
		
	}).catch( (err) => {
		console.log( err );
	});	
	
};

function returnLoginUser (password, res, usersFound) {
	
	// ¿User encontrado?
	let user;
	
	if (usersFound.length === 0) {
		
		res.send({
			error: "User not found."
		});
		
		return;
		
	} else {
		user = usersFound[0];
	};
	
	
	// ¿Pass correcta?
	if (password === user.password) {
		
		res.send({
			token: user._id
		});		
		
	} else {
		
		res.send({
			error: "Wrong password"
		});
		
	};
	

	
};




const logoutUser = (req, res) => {
	
	
	
};



module.exports = {
	registerUser,
	getAllUsers,
	getUser,
	deleteUser,
	loginUser,
	logoutUser
};