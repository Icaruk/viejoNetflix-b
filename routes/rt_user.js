
const router = require ("express").Router();
const { registerUser, loginUser, logoutUser, getAllUsers, getUser, deleteUser }  = require("../DB/db_user");
const hasValidToken = require("../MW/hasValidToken");
const hasAdminLevel = require("../MW/hasAdminLevel");


router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.get("/user/logout", hasValidToken, logoutUser);

router.get("/user/all", hasValidToken, getAllUsers);
router.get("/user/:id", hasValidToken, getUser);

router.delete("/user/delete/:id", hasValidToken, (req, res, next)=> {hasAdminLevel (4, req, res, next)}, deleteUser);

module.exports = router;


