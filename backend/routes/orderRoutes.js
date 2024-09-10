const express=require('express')
const router=express.Router()
const orderController=require('../controllers/orderController')
const {protect, admin}=require('../middleware/authMiddleware')

router
.route('/')
.post(protect, orderController.addOrderItems)
.get(protect, admin, orderController.getAllOrders)

router.route('/myorders').get(protect, orderController.getMyOrders)

router.route('/:id').get(protect, orderController.getOrderById)

router.route('/:id/pay').put(protect, orderController.updateOrderToPaid)

router.route('/:id/deliver').put(protect, admin, orderController.updateOrderToDelivered)


module.exports=router;

