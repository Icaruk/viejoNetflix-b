
const MovieModel = require("../models/Movie");
const parseLimit = require ("../utils/parseLimit");


const getMoviesBySearch = (req, res) => {
	
	let id = req.query.id;
	let title = req.query.title;
	let idGenre = req.query.genre;
	let limit = parseLimit(req.query.limit);
	
	
	if (id) {
		
		MovieModel.findOne(
			{id: id}
		).limit(
			limit
		).then ( (movies) => {
			res.send(movies);
		}).catch( (err) => {
			console.log( err );
		});
		
	} else if (title) {
		
		MovieModel.find({
			title: {$regex: `.*${title}.*`}
		}).limit(
			limit
		).then ( (movies) => {
			
			if (!movies) {
				
				res.send({
					total_results: 0
				})
				
			} else {
				
				res.send({
					total_results: movies.length,
					results: movies
				});
				
			};
			
		}).catch( (err) => {
			console.log( err );
		});
		
	} else if (idGenre) {
		
		idGenre = parseInt(idGenre);
		
		MovieModel.find({
			genre_ids: idGenre
		}).limit(
			limit
		).then ( (movies) => {
			
			res.send({
				total_results: movies.length,
				results: movies
			});
			
		}).catch( (err) => {
			console.log( err );
		});
		
	};
	
};


const getAllMovies = (req, res) => {
	
	MovieModel.find(
		{}
	).then( (movies) => {
		res.send({
			total_results: movies.length,
			results: movies			
		});
	}).catch( (err) => {
		console.log( err );
	});
	
};



const getPopularMovies = (req, res) => {
	
	let limit = parseLimit(req.query.limit);
	
	
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
	
	let limit = parseLimit(req.query.limit);
	
	
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
	
	let limit = parseLimit(req.query.limit);
	
	
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
	getMoviesBySearch,
	getAllMovies,
	getPopularMovies,
	getNewestMovies,
	getOldestMovies,
	addMovie,
	deleteMovie
};