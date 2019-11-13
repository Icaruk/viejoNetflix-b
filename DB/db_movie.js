
const MovieModel = require("../models/Movie");



const addMovie = (req, res) => {
	
	let bodyData = req.body;
	
	
	new MovieModel ({
		
		id: 				bodyData.id,
		title: 				bodyData.title,
		original_title: 	bodyData.original_title,
		release_date: 		bodyData.release_date,
		runtime: 			bodyData.runtime,
		overview: 			bodyData.overview,
		poster_path: 		bodyData.poster_path,
		backdrop_path: 		bodyData.backdrop_path,
		video: 				bodyData.video,
		genre_ids: 			bodyData.genre_ids,
		adult: 				bodyData.adult,
		original_language: 	bodyData.original_language,
		popularity: 		bodyData.popularity,
		vote_count: 		bodyData.vote_count,
		vote_average: 		bodyData.vote_average
		
	}).save().then( (user) => {
		res.send(user);
	}).catch( (err) => {
		console.log( err );
	});
	
};



const addMovie_debug = (rawData) => {
	
	console.log( "Guardando id: " + rawData.id );
	MovieModel.insert
	
	new MovieModel ({
		
		id: 				rawData.id,
		title: 				rawData.title,
		original_title: 	rawData.original_title,
		release_date: 		rawData.release_date,
		runtime: 			rawData.runtime,
		overview: 			rawData.overview,
		poster_path: 		rawData.poster_path,
		backdrop_path: 		rawData.backdrop_path,
		video: 				rawData.video,
		genre_ids: 			rawData.genre_ids,
		adult: 				rawData.adult,
		original_language: 	rawData.original_language,
		popularity: 		rawData.popularity,
		vote_count: 		rawData.vote_count,
		vote_average: 		rawData.vote_average
		
	});
	
	
};



const getAllMovies = (req, res) => {
	
	MovieModel.find(
		{}
	).then ( (allMovies) => {
		res.send(allMovies);
	}).catch( (err) => {
		console.log( err );
	})
	
};




module.exports = {
	addMovie,
	getAllMovies,
	addMovie_debug
};