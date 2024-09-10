const  express =require('express') 
const router=express.Router()
const productController=require('../controllers/productController')
const {protect, admin}=require('../middleware/authMiddleware')



router
.route('/')
.get(productController.getProduct)
.post(protect, admin, productController.createProduct);

router
.route('/top')
.get(productController.getTopProducts)

router
.route('/:id')
.get(productController.getProductById)
.put(protect, admin, productController.updateProduct)
.delete(protect, admin, productController.deleteProduct);

router
.route('/:id/reviews')
.post(protect, productController.createProductReview)

module.exports=router;