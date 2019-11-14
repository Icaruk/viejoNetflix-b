
const router = require ("express").Router();
const { registerUser, getAllUsers }  = require("../DB/db_user");


router.post("/user/register", registerUser);
router.get("/user/all", getAllUsers);


module.exports = router;


