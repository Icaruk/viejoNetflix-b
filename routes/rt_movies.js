
const router = require ("express").Router();
const {
	getMoviesById,
	getMoviesByTitle,
	getMoviesByGenre,
	getPopularMovies,
	getNewestMovies,
	getOldestMovies,
	addMovie,
	deleteMovie
} = require("../DB/db_movie");



router.get("/movie/id/:id", getMoviesById);
router.get("/movie/title/:title", getMoviesByTitle);
router.get("/movie/genre/:genre1/:genre2?", getMoviesByGenre);


router.get("/movie/popular/:limit?", getPopularMovies);
router.get("/movie/newest/:limit?", getNewestMovies);
router.get("/movie/oldest/:limit?", getOldestMovies);

router.post("/movie/add", addMovie);
router.delete("/movie/delete/:id", deleteMovie);


module.exports = router;