
const mongoose = require("mongoose");


const MovieSchema = mongoose.Schema({
	
	id: {
		type: Number,
		unique: true
	},
	
	title: {
		type: String
	},
	original_title: {
		type: String
	},
	release_date: {
		type: Date
	},
	runtime: {
		type: Number
	},
	
	overview: {
		type: String
		
	},
	poster_path: {
		type: String
	},
	backdrop_path: {
		type: String
		
	},
	video: {
		type: Boolean
	},
	
	genre_ids: {
		type: Array
	},	
	adult: {
		type: Boolean
	},
	original_language: {
		type: String
	},
	
	popularity: {
		type: Number
	},
	vote_count: {
		type: Number
	},
	vote_average: {
		type: Number
	}
	
});



const MovieModel = mongoose.model("movie", MovieSchema);
module.exports = MovieModel;


