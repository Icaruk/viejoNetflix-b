
const router = require ("express").Router();
const { registerUser, loginUser, logoutUser, getAllUsers, getUser, deleteUser }  = require("../DB/db_user");
const hasValidToken = require("../MW/hasValidToken");


router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.get("/user/logout", hasValidToken, logoutUser);

router.get("/user/all", hasValidToken, getAllUsers);
router.get("/user/:id", hasValidToken, getUser);

router.delete("/user/delete/:id", hasValidToken, deleteUser);

module.exports = router;


