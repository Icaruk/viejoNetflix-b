
const router = require ("express").Router();
const {
	addOrder,
	setOrderStatus,
	deleteOrder,
	getOrder,
	getOrdersByClient
} = require("../DB/db_order");
const hasValidToken = require("../MW/hasValidToken");



router.post("/order/add", hasValidToken, addOrder);
router.get("/order/:id", hasValidToken, getOrder);
router.get("/order/client/:userId", hasValidToken, getOrdersByClient);
router.get("/order/setStatus/:id", hasValidToken, setOrderStatus);
router.delete("/order/delete/:id", hasValidToken, (req, res, next)=> {hasAdminLevel (4, req, res, next)},deleteOrder);



module.exports = router;


