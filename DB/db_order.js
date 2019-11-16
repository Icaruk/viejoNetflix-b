
const OrderModel = require("../models/Order");



const addOrder = (req, res) => {
	
	console.log( req.body );
	let bodyData = req.body;
	
	
	// Busco si el el client_id ya tiene un order
	OrderModel.find({
		_id: id
	});
	
	
	new OrderModel ({
		
		movieId: 	bodyData.movieId,
		clientId: 	bodyData.clientId,
		startDate: 	bodyData.startDate,
		endDate: 	bodyData.endDate,
		city: 		bodyData.city,
		status: 	0
		
	}).save().then( (order) => {
		res.send(order);
	}).catch( (err) => {
		console.log( err );
	});
	
};



const deleteOrder = (req, res) => {
	
	let id = req.params.id;
	
	
	OrderModel.findByIdAndDelete({
		_id: id
	}).then( (cadaver) => {
		
		if (cadaver) {
			res.send({
				message: `Order ${_id} has been deleted.`
			});
		} else {
			res.send({
				action: "deleteOrder",
				error: `Order with id ${id} not found.`
			})
		};
		
	}).catch( () => {
		res.send({
			action: "deleteOrder",
			error: `Order with ${_id} not found.`
		})		
	});	
	
};



const setOrderStatus = (req, res) => {
	
	let id = req.params.id;
	let status = req.params.status;
	
	
	OrderModel.findOneAndUpdate({
		_id: id
	}, {
		status: status
	}).then( (order) => {
		
		if (order) {
			res.send({
				message: `Order ${order._id} status has been changed to ${status}.`
			});
		} else {
			res.send({
				action: "setOrderStatus",
				error: `Order with id ${id} not found.`
			})
		};
		
	}).catch( (err) => {
		console.log( err );
	});
	
};



const getOrder = (req, res) => {
	
	let id = req.params.id;
	
	
	OrderModel.findOne({
		_id: id
	}).then( (order) => {
		
		if (order) {
			res.send(order)
		} else {
			res.send({
				action: "getOrder",
				error: `Order with id ${id} not found.`
			})
		};
		
	}).catch( (err) => {
		console.log( err );
	});
	
};



module.exports = {
	addOrder,
	setOrderStatus,
	deleteOrder,
	getOrder
};