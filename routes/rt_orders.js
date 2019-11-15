const router = require ("express").Router();
const { addOrder, endOrder, deleteOrder, getOrder } = require("../DB/db_order");


router.post("/order/add", addOrder);
router.get("/order/:id", getOrder);
router.get("/order/complete/:id", endOrder);
router.delete("/order/delete/:id", deleteOrder);


module.exports = router;