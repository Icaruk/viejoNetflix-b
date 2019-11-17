
const TokenModel = require("../models/Token");


const hasAdminLevel = (adminLevelRequired, req, res, next) => {
	
	let adminLevel = req.adminLevel;
	
	if (adminLevel < adminLevelRequired) {
		
		res.status(401);
		res.send({
			error: `This action requires at least admin level ${adminLevelRequired}`
		});
		
	} else {
		
		next();
		
	};
	
};


module.exports = hasAdminLevel;