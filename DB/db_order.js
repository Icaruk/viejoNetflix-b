
const OrderModel = require("../models/Order");



const addOrder = (req, res) => {
	
	let bodyData = req.body;
	
	
	// Busco si el el clientId ya tiene un order
	OrderModel.countDocuments({
		clientId: bodyData.clientId,
		status: 0
	}).then( (count)=> {
		
		// Tiene algún pedido
		if (count > 0) {
			
			res.send({
				action: "addOrder",
				error: `The client ${bodyData.clientId} already has an order.`
			});
		
		// No tiene pedidos
		} else {
			
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
				message: `Order ${id} has been deleted.`
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
	let status = req.query.status;
	
	console.log( req.params );
	console.log( req.query );
	
	
	// Compruebo
	if (!id) {
		res.send({
			action: "setOrderStatus",
			error: "No id provided."
		});
		
		return;
	};
	
	if (!status) {
		res.send({
			action: "setOrderStatus",
			error: "No status provided."
		});
		
		return;
	};
	
	
	// Convierto a número
	status = parseInt(status);
	
	
	// Compruebo si el estado es válido
	if (![0, 1, 2].includes(status)) {
		res.send({
			action: "setOrderStatus",
			error: "Invalid status provided."
		})
		
		return;
	};
	
	
	
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



const getOrdersByClient = (req, res) => {
	
	let clientId = req.params.clientId;
	
	
	OrderModel.find({
		clientId: clientId,
		status: 0
	}).then( (orders) => {
		res.send(orders)
	}).catch( (err) => {
		console.log( err );
	});
	
};



module.exports = {
	addOrder,
	setOrderStatus,
	deleteOrder,
	getOrder,
	getOrdersByClient
};