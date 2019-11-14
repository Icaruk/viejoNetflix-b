
const router = require ("express").Router();
const { registerUser, loginUser, getAllUsers, getUser, deleteUser }  = require("../DB/db_user");


router.post("/user/register", registerUser);
router.post("/user/login", loginUser);

router.get("/user/all", getAllUsers);
router.get("/user/:id", getUser);

router.delete("/user/delete/:id", deleteUser);

module.exports = router;


