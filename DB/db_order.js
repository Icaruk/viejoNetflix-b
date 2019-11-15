
const OrderModel = require("../models/Order");



const addOrder = (req, res) => {
	
	console.log( req.body );
	let bodyData = req.body;
	
	
	new OrderModel ({
		
		movieId: 	bodyData.movieId,
		clientId: 	bodyData.clientId,
		startDate: 	bodyData.startDate,
		endDate: 	bodyData.endDate,
		city: 		bodyData.city,
		completed: 	false
		
	}).save().then( (order) => {
		res.send(order);
	}).catch( (err) => {
		console.log( err );
	});
	
};



const deleteOrder = (req, res) => {
	
	let id = req.params.id;
	
	
	OrderModel.findByIdAndDelete({
		id: id
	}).then( () => {
		
	}).catch( () => {
		
	});	
	
};



const endOrder = (req, res) => {
	
	let id = req.params.id;
	let bool = req.params.bool;
	
	
	OrderModel.findOneAndUpdate({
		_id: id
	}, {
		completed: bool
	}).then( (order) => {
		res.send({
			message: `Order ${order._id} has been completed.`
		});
	}).catch( (err) => {
		console.log( err );
	});
	
};



const getOrder = (req, res) => {
	
	let id = req.params.id;
	
	
	OrderModel.find({
		_id: id
	}).then( (order) => {
		
		res.send(order)
		
	}).catch( () => {
		
	});
	
};



module.exports = {
	addOrder,
	endOrder,
	deleteOrder,
	getOrder
};