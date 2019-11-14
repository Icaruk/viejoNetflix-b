
const OrderModel = require("../models/Order");



const addOrder = (req, res) => {
	
	let bodyData = req.body;
	
	
	new OrderModel ({
		
		id: bodyData.id
		
	}).save().then( (user) => {
		res.send(user);
	}).catch( (err) => {
		console.log( err );
	});
	
};



const endOrder = (req, res) => {
	
	
	
};



const deleteOrder = (req, res) => {
	
	
	
};



const getOrder = (req, res) => {
	
	
	
};



module.exports = {
	addOrder,
	endOrder,
	deleteOrder,
	getOrder
};