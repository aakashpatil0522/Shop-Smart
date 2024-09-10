const express=require('express');
const router=express.Router();
const userController=require('../controllers/userController');
const {protect, admin}=require('../middleware/authMiddleware');

router
.route('/')
.get(protect, admin, userController.getUsers)
.post(userController.registerUser)

router.post('/logout', userController.logoutUser)
router.post('/auth', userController.authUser)
router
.route('/profile')
.get(protect, userController.getUserProfile)
.put(protect, userController.updateUserProfile)

router
.route('/:id')
.delete(protect, admin, userController.deleteUser)
.get(protect, admin, userController.getUserbyId)
.put(protect, admin, userController.updateUserbyId)

module.exports=router;