const asyncHandler=require('../middleware/asyncHandler');
const Order=require('../model/orderModel');


// desc   create new order
// @route Post /api/orders
// access private
exports.addOrderItems=asyncHandler(async(req,resp)=>{
    // resp.send('addOrderItems')
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    }=req.body

    if(orderItems && orderItems.length===0){
        resp.status(400)
        throw new Error("No Order Items")
    }else{
        const order=new Order({
            orderItems:orderItems.map((x)=>({
                ...x,
                product:x._id,
                _id:undefined
            })),
            user:req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })
        
        const createdOrder=await order.save()

        resp.status(201).json(createdOrder)
    }
});


// desc   Get logged in user orders
// @route Get /api/orders/myorders
// access private
exports.getMyOrders=asyncHandler(async(req,resp)=>{
    // resp.send('Get My Orders')
    const orders=await Order.find({user:req.user._id});
    resp.status(200).json(orders)
});


// desc   Get order by Id
// @route Get /api/orders/:id
// access private
exports.getOrderById=asyncHandler(async(req,resp)=>{
    // resp.send('get order by id')
    const order=await Order.findById(req.params.id).populate('user','name email');
    
    if(order){
        resp
        .status(200)
        .json(order)
    }else{
        resp.status(404)
        throw new Error("Order not found")
    }
});


// desc   Update order to paid
// @route Put /api/orders/:id/pay
// access private
exports.updateOrderToPaid=asyncHandler(async(req,resp)=>{
    // resp.send('update order to paid')
    const order=await Order.findById(req.params.id)

    if(order){
        order.isPaid=true;
        order.paidAt=Date.now();
        order.paymentResult={
            id:req.body.id,
            status:req.body.status,
            update_time:req.body.update_time,
            email_address:req.body.payer.email_address
        }

        const updateOrder=await order.save()

        resp.status(200).json(updateOrder)
    }else{
        resp.status(404)
        throw new Error('Order Not found')
    }
});



// desc   Update order to delivered
// @route Put /api/orders/:id/deliver
// access private/admin
exports.updateOrderToDelivered=asyncHandler(async(req,resp)=>{
    // resp.send('update order to Delivered')
    const order=await Order.findById(req.params.id)

    if(order){
        order.isDelivered=true
        order.deliveredAt=Date.now()

        const updatedOrder=await order.save()
        resp.status(200).json(updatedOrder)
    }else{
        resp.status(404)
        throw new Error("Order not found")
    }
    
});



// desc   Get all order
// @route Get /api/orders
// access private/admin
exports.getAllOrders=asyncHandler(async(req,resp)=>{
    const order=await Order.find({}).populate('user', 'id name');
    resp.status(200).json(order)
});


