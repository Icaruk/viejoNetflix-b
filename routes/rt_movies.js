
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
const ignoreTokenForLimit = require("../MW/ignoreTokenForLimit");



router.get("/movie/search", hasValidToken, getMoviesBySearch);
router.get("/movie/all", hasValidToken, getAllMovies);


router.get("/movie/popular", ignoreTokenForLimit, hasValidToken, getPopularMovies);
router.get("/movie/newest", ignoreTokenForLimit, hasValidToken, getNewestMovies);
router.get("/movie/oldest", ignoreTokenForLimit, hasValidToken, getOldestMovies);

router.post("/movie/add", hasValidToken, (req, res, next)=> {hasAdminLevel (2, req, res, next)},addMovie);
router.delete("/movie/delete/:id", hasValidToken, (req, res, next)=> {hasAdminLevel (3, req, res, next)},deleteMovie);


module.exports = router;


