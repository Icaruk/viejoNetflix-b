
const OrderModel = require("../models/Order");



const addOrder = (req, res) => {
	
	let bodyData = req.body;
	
	
	console.log( bodyData );
	
	
	
	// Busco si el el userId ya tiene un order
	OrderModel.countDocuments({
		userId: bodyData.userId,
		status: 0
	}).then( (count)=> {
		
		// Tiene algún pedido
		if (count > 0) {
			
			res.send({
				errorCode: "order_add_1",
				error: `The client ${bodyData.userId} already has an order.`
			});
			
		// No tiene pedidos
		} else {
			
			// Obtengo días de alquilar
			let days = bodyData.days;
			
			if (!days) {
				days = 2;	
			};
			
			
			// Calculo fechas
			let startDate = Date.now(); // ms
			let endDate = startDate + days * 24 * 60 * 60 * 1000; // días * 24h * 60 min * 60 s * 1000 ms
			
			
			new OrderModel ({
				
				movieId: 	bodyData.movieId,
				userId: 	bodyData.userId,
				startDate: 	startDate,
				endDate: 	endDate,
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
				errorCode: "order_delete_1",
				error: `Order with id ${id} not found.`
			})
		};
		
	}).catch( () => {
		res.send({
			errorCode: "order_delete_1",
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
			errorCode: "order_set_1",
			error: "No id provided."
		});
		
		return;
	};
	
	if (!status) {
		res.send({
			errorCode: "order_set_2",
			error: "No status provided."
		});
		
		return;
	};
	
	
	// Convierto a número
	status = parseInt(status);
	
	
	// Compruebo si el estado es válido
	if (![0, 1, 2].includes(status)) {
		res.send({
			errorCode: "order_set_3",
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
				errorCode: "order_set_4",
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
				errorCode: "order_get_1",
				error: `Order with id ${id} not found.`
			})
		};
		
	}).catch( (err) => {
		console.log( err );
	});
	
};



const getOrdersByClient = (req, res) => {
	
	let userId = req.params.userId;
	
	
	OrderModel.find({
		userId: userId,
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