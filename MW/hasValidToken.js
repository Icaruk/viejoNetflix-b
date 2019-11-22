
const TokenModel = require("../models/Token");


const hasValidToken = async (req, res, next) => {
	
	let token = req.query.token;
	
	
	// ¿Ignoro token?
	if (req.ignoreToken) {
		next();
		return;
	};
	
	
	// No hay token
	if (!token) {
		
		responseToken("invalid", res);
		
	} else {
		
		// ¿Token válido?
		if (token.length !== 24) {
			responseToken("invalid", res);
			return;
		};
		
		
		// ¿Existe el token?
		const tokenFound = await TokenModel.findById(
			token
		);
		
		
		if (!tokenFound) {
			
			responseToken("unauthorized", res);
			
		} else {
			
			// Fecha de hoy
			const date = new Date (Date.now());
			
			
			// Compruebo si el token no está caducado
			if (tokenFound.endDate < date) {
				
				// Borro el token caducado
				await TokenModel.findByIdAndRemove(tokenFound._id),
				
				
				// Respondo
				responseToken("expired", res);
				return;
				
			};
			
			
			// Guardo el nivel de admin
			req.adminLevel = tokenFound.adminLevel;
			next();
			
		};
		
	};
	
};



const responseToken = (resId, res) => {
	// "invalid", "unauthorized"
	
	
	switch (resId) {
		
		case "invalid":
			
			res.status(400);
			res.send({
				errorCode: "token_1",
				error: "Invalid token provided."
			});
			
		break;
		
		case "unauthorized":
			
			res.status(401);
			res.send({
				errorCode: "token_2",
				error: "Unauthorized."
			});
			
		break;
		
		case "expired":
			
			res.status(401);
			res.send({
				errorCode: "token_3",
				error: "Token expired, login again."
			});
		
		break;
		
	};
	
};




module.exports = hasValidToken;

