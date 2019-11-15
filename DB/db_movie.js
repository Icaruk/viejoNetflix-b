
const MovieModel = require("../models/Movie");



const getMoviesById = (req, res) => {
	
	let id = req.params.id;
	
	
	MovieModel.findOne(
		{id: id}
	).then ( (movies) => {
		res.send(movies);
	}).catch( (err) => {
		console.log( err );
	});
	
};



const getMoviesByTitle = (req, res) => {
	
	let title = req.params.title;
	
	
	MovieModel.find({
		title: {$regex: `.*${title}.*`}
	}).then ( (movies) => {
		
		res.send({
			total_results: movies.length,
			results: movies
		});
		
	}).catch( (err) => {
		console.log( err );
	});
	
};



const getMoviesByGenre = (req, res) => {
	
	let genre = req.params.genre1;
	genre = parseInt(genre);
	
	MovieModel.find({
		genre_ids: genre
	}).then ( (movies) => {
		
		res.send({
			total_results: movies.length,
			results: movies
		});
		
	}).catch( (err) => {
		console.log( err );
	});
	
};



const getPopularMovies = (req, res) => {
	
	// Default 50, min 3, max 500
	
	let limit = req.params.limit;
	if (!limit) {limit = 50};
	
	limit = parseInt(limit);
	limit = (Math.max(
		Math.min(limit, 500),
		3
	));
	
	
	MovieModel.find(
		{}
	).limit(
		limit
	).sort({
		popularity: -1
	}).then ( (movies) => {
		
		res.send({
			total_results: movies.length,
			results: movies
		});
		
	}).catch( (err) => {
		console.log( err );
	})
	
};



const getNewestMovies = (req, res) => {
	
	// Default 50, min 3, max 500
	
	let limit = req.params.limit;
	if (!limit) {limit = 50};
	
	limit = parseInt(limit);
	limit = (Math.max(
		Math.min(limit, 500),
		3
	));
	
	
	MovieModel.find(
		{}
	).limit(
		limit
	).sort({
		release_date: -1
	}).then ( (movies) => {
		
		res.send({
			total_results: movies.length,
			results: movies
		});
		
	}).catch( (err) => {
		console.log( err );
	})
	
};



const getOldestMovies = (req, res) => {
	
	// Default 50, min 3, max 500
	
	let limit = req.params.limit;
	if (!limit) {limit = 50};
	
	limit = parseInt(limit);
	limit = (Math.max(
		Math.min(limit, 500),
		3
	));
	
	
	MovieModel.find({
		release_date: {$ne: null}
	}).limit(
		limit
	).sort({
		release_date: 1
	}).then ( (movies) => {
		
		res.send({
			total_results: movies.length,
			results: movies
		});
		
	}).catch( (err) => {
		console.log( err );
	})
	
};



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



const deleteMovie = (req, res) => {
	
	let id = req.params.id;
	
	
	MovieModel.findOneAndDelete({
		id: id
	}).then( (cadaver) => {
		
		if (cadaver) {
			res.send({
				message: `Movie ${cadaver.id} DELETED: Title: ${cadaver.title}`
			});
		} else {
			res.send({
				action: "deleteMovie",
				error: `Movie with id ${id} not found.`
			})
		};
		
	}).catch( (err) => {
		console.log( err );
	});
	
	
};



module.exports = {
	getMoviesById,
	getMoviesByTitle,
	getMoviesByGenre,
	getPopularMovies,
	getNewestMovies,
	getOldestMovies,
	addMovie,
	deleteMovie
};