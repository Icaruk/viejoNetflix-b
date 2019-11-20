
function parseLimit (limit, min = 3, max = 500) {
	/*
		parseLimit(10); // 10
		parseLimit(24, 5, 100); // 24
		
		limit: 	NUMBER - Límite a modificar.
		min (opc): 	NUMBER - Valor mínimo que adoptará.
		max (opc): 	NUMBER - Valor máximo que adoptará.
	*/
	
	if (!limit) {
		limit = 50
	} else {
		limit = parseInt(limit)
	};
	
	
	limit = (Math.max(
		Math.min(limit, max),
		min
	));
	
	
	return limit;
	
};

module.exports = parseLimit;