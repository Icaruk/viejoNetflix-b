
const router = require ("express").Router();
const {
	getMoviesBySearch,
	getAllMovies,
	getPopularMovies,
	getNewestMovies,
	getOldestMovies,
	addMovie,
	deleteMovie
} = require("../DB/db_movie");
const hasValidToken = require("../MW/hasValidToken");



router.get("/movie/search", hasValidToken, getMoviesBySearch);
router.get("/movie/all", hasValidToken, getAllMovies);


router.get("/movie/popular/:limit?", hasValidToken, getPopularMovies);
router.get("/movie/newest/:limit?", hasValidToken, getNewestMovies);
router.get("/movie/oldest/:limit?", hasValidToken, getOldestMovies);

router.post("/movie/add", hasValidToken, (req, res, next)=> {hasAdminLevel (2, req, res, next)},addMovie);
router.delete("/movie/delete/:id", hasValidToken, (req, res, next)=> {hasAdminLevel (3, req, res, next)},deleteMovie);


module.exports = router;


