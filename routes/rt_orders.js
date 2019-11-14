const router = require ("express").Router();
const { addOrder, endOrder, deleteOrder, getOrder } = require("../DB/db_order");


router.post("/order/add", addOrder);
router.post("/order/end/:id", endOrder);
router.post("/order/delete/:id", deleteOrder);
router.get("/order/:id", getOrder);


module.exports = router;