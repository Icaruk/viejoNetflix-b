
const TokenModel = require("../models/Token");


const ignoreTokenForLimit = (req, res, next) => {
	
	let limit = req.query.limit;
	
	
	// No hay límite
	if (!limit) {
		next();
	} else {
		
		if (limit <= 10) { // si el límite es menor
			req.ignoreToken = true; // ignoro token
		};
		
		next();
		
	};
	
};



module.exports = ignoreTokenForLimit;

