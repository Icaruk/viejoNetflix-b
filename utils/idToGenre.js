
const idToGenre = (id, returnGenre = true) => {
	// idToGenre(12); 					// "Aventura"
	// idToGenre("Comedia", false); 	// 35
	
	const traductor = {
		
		12: "Aventura",
		14: "Fantasía",
		18: "Drama",
		16: "Animación",
		27: "Terror",
		28: "Acción",
		35: "Comedia",
		36: "Historia",
		53: "Suspense",
		37: "Western",
		80: "Crimen",
		99: "Documental",
		878: "Ciencia ficción",
		9648: "Misterio",
		10402: "Música",
		10751: "Familia",
		10749: "Romance",
		10770: "Película de TV",
		10752: "Bélica"
		
	};
	
	
	
	// id --> genre
	if (returnGenre) {
		
		let res = traductor[id];
		
		if (res) {
			return res;
		} else {
			return "";
		};
		
		
	// genre --> id
	} else {
		
		let res = -1;
		
		// Itero todas las keys
		for (let _x in traductor) {
			if (traductor[_x] == id) { // la propiedad de esa key coincide con el value que estoy buscando
				res = _x;
				break;
			};
		};
		
		
		return res;
		
	};
	
};


module.exports = idToGenre;
