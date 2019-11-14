
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



const getAllMovies = (req, res) => {
	
	MovieModel.find(
		{}
	).then ( (allMovies) => {
		res.send(allMovies);
	}).catch( (err) => {
		console.log( err );
	})
	
};



const getMovie = (req, res) => {
	
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