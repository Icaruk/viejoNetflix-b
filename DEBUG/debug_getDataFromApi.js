
/*
Ejecutar con:
	node .\DEBUG\debug_getDataFromApi.js
*/


// Imports
const mongoose = require("mongoose");
const axios = require('axios');
const { addMovie_debug }  = require("../DB/db_movie");
const MovieModel = require("../models/Movie");



// DB
const uri = "mongodb+srv://Server_viejoNetflix:1234@cluster0-j9rpr.mongodb.net/viejoNetflix?retryWrites=true&w=majority";

mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true	
}).then( () => {
	
	console.log( "    ---> Connected to mongoDB" );
	
	
	
	// Pillo datos de la API
	let multi = 0;
	let page_ini = 1 + (40 * multi);
	let page_fin = 40 + (40 * multi);
	
	
	// De la página 1 a la 10
	for (let page = page_ini; page <= page_fin; page ++) {
		
		let uri = `https://api.themoviedb.org/3/movie/popular?api_key=210d6a5dd3f16419ce349c9f1b200d6d&language=es-ES&page=${page}`;
		
		
		axios.get(uri)
		.then(function (res) {
			
			let data = res.data;
			/*
				Contiene:
					page
					total_results
					total_pages
					results []
				.
			*/
			
			let movies = res.data.results; // Contiene un array de objetos	
			
			
			
			// Guardo el array de objetos en la db
			MovieModel.insertMany(movies).then( (movies) => {
				// console.log("Página " + page + " guardada.")
			}).catch( (err) => {
				console.log( err );
			})
			
			
		})
		.catch(function (error) {
			console.log(error);
		});
		
	};
	
	
	console.log( `---> [x${multi}] Páginas guardadas: ${page_ini} - ${page_fin}` );
	
	
	setTimeout( () => {
		console.log( ">>> Go!" );
	}, 1000 * 15);
	
	
}).catch( (err) => {
	console.log( err );
});





