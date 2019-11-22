
const TokenModel = require("../models/Token");


const hasAdminLevel = (adminLevelRequired, req, res, next) => {
	
	let adminLevel = req.adminLevel;
	
	
	// Si no viene admin level, lo pongo a 0
	if (!adminLevel) {
		adminLevel = 0;
	};
	
	
	// Compruebo admin level requerido
	if (adminLevel < adminLevelRequired) {
		
		res.status(401);
		res.send({
			errorCode: "admin_1",
			error: `This action requires at least admin level ${adminLevelRequired}`
		});
		
	} else {
		
		next();
		
	};
	
};


module.exports = hasAdminLevel;