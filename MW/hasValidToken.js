
const TokenModel = require("../models/Token");


const hasValidToken = (req, res, next) => {
	
	let token = req.query.token;
	
	
	// No hay token
	if (!token) {
		
		res.status(401);
		res.send({
			error: "Unauthorized."
		});
		
	} else {
		
		// ¿Token válido?
		if (token.length !== 24) {
			
			responseToken("invalid", res);
			
			return;
		};
		
		
		// ¿Existe el token?
		TokenModel.findById(
			token
		).then( (tokenFound) => {
			
			if (!tokenFound) {
				responseToken("unauthorized", res);
			} else {
				req.adminLevel = tokenFound.adminLevel; // guardo el nivel de admin
				next();
			};
			
		}).catch( (err) => {
			console.log( err );
		});
		
	};
	
};



const responseToken = (resId, res) => {
	// "invalid", "unauthorized"
	
	switch (resId) {
		
		case "invalid":
			
			res.status(400);
			res.send({
				error: "Invalid token provided."
			});
			
		break;
		
		case "unauthorized":
			
			res.status(401);
			res.send({
				error: "Unauthorized."
			});
			
		break;
		
	};
	
};




module.exports = hasValidToken;

