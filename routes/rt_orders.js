
const router = require ("express").Router();
const { addOrder, setOrderStatus, deleteOrder, getOrder } = require("../DB/db_order");
const hasValidToken = require("../MW/hasValidToken");



router.post("/order/add", hasValidToken, addOrder);
router.get("/order/:id", hasValidToken, getOrder);
router.get("/order/setStatus/:id&:status?", hasValidToken, setOrderStatus);
router.delete("/order/delete/:id", hasValidToken, deleteOrder);


module.exports = router;