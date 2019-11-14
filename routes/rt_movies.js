
const router = require ("express").Router();
const { addMovie, getAllMovies } = require("../DB/db_movie");


router.get("/movie/:id", getMovie);
router.get("/movie/all", getAllMovies);
router.post("/movie/add", addMovie);


module.exports = router;