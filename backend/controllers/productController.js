const Product = require('../model/productModel.js')
const asyncHandler = require('../middleware/asyncHandler.js');


// desc   fetch all products
// @route GET/api/products
// access public
exports.getProduct=asyncHandler(async(req,resp)=>{
    // pagination
    const pageSize=process.env.PAGINATION;
    const page=Number(req.query.pageNumber) || 1;

    // search
    const keyword=req.query.keyword ? {name :{$regex : req.query.keyword, $options:'i'}}: {}

    const count=await Product.countDocuments({...keyword});

    const products=await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1))
    resp.status(200).json({products, page, pages:Math.ceil(count/pageSize)})
});


// desc   fetch all products
// @route GET/api/products/:id
// access public
exports.getProductById=asyncHandler(async(req,resp)=>{
    const product=await Product.findById(req.params.id)
    if(product){
        resp.json(product)
    }else{
        resp.status(404)
        throw new Error('Product Not Found')
    }
})

// desc   Create Product
// @route POST /api/products
// access private/admin
exports.createProduct=asyncHandler(async(req,resp)=>{
    try {
        const product=new Product({
            name:'Sample Name',
            price:0,
            user:req.user._id,
            image:'./images/sample.jpg',
            brand:"Sample Brand",
            category:"Sample Category",
            countInStock:0,
            numReviews:0,
            description:"Sample description"
        })
    
        const createdProduct=await product.save()
        resp.status(201).json(createdProduct)
    } catch (error) {
        resp.status(500).json(error)
    }
})


// desc   Update Product
// @route PUT /api/products/:id
// access private/admin
exports.updateProduct=asyncHandler(async (req, resp)=>{
    const { name, price, description, image, brand, category, countInStock }=req.body

    const product=await Product.findById(req.params.id)

    if(product){
        product.name=name
        product.price=price
        product.description=description
        product.image=image
        product.brand=brand
        product.category=category
        product.countInStock=countInStock

        const updatedProduct=await product.save()
        resp.json(updatedProduct)
    }else{
        resp.status(404)
        throw new Error("product not found")
    }
}) 

// desc   Delete Product
// @route DELETE /api/products/:id
// access private/admin
exports.deleteProduct=asyncHandler(async (req,resp)=>{
    const product= await Product.findById(req.params.id)

    if(product){
        await product.deleteOne({_id:product._id});
        resp.status(200).json({message:'Product Deleted'})
    }else{
        resp.status(404);
        throw new Error('Product Not Found')
    }
})


// desc   Create Review
// @route POST /api/products/:id/reviews
// access private
exports.createProductReview=asyncHandler(async(req,resp)=>{
    const { rating, comment }=req.body

    const product = await Product.findById(req.params.id);

    if(product){
        const alreadyReviewed=product.reviews.find((review)=> review.user.toString()===review.user._id.toString())

        if(alreadyReviewed){
            resp.status(400);
            throw new Error("Product Already Reviewed")
        }

        const review={
            name:req.user.name,
            rating:Number(rating),
            comment,
            user:req.user._id
        }

        product.reviews.push(review);

        product.numReviews=product.reviews.length

        product.rating=product.reviews.reduce((acc, review)=> acc + review.rating, 0)/product.reviews.length;

        await product.save();
        resp.status(201).json({message:'Review Added'})
    }else{
        resp.status(404)
        throw new Error("Product not found")
    }
})

// desc   Get Top Rated Product
// @route GET /api/products/top
// access Public


exports.getTopProducts= asyncHandler(async(req,resp)=>{
    const products=await Product.find({}).sort({rating:-1}).limit(3);
    resp.status(200).json(products)
})
