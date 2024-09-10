const asyncHandler=require('../middleware/asyncHandler');
const User=require('../model/userModel');
const generateToken=require('../utils/generateToken');


// desc   Auth user & get token
// @route POST /api/users/login
// access public
exports.authUser=asyncHandler(async(req,resp)=>{
    const { email, password } = req.body
    const user=await User.findOne({email})
    if(user && (await user.comparePassword(password))){

        generateToken(resp, user._id)
        
        resp.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin
        });
    }else{
        resp.status(401)
        throw new Error("invalid email or password")
    }
})



// desc   register user
// @route POST /api/users
// access public
exports.registerUser=asyncHandler(async(req,resp)=>{
    const { name, email, password }=req.body

    const userExists=await User.findOne({email});
    if(userExists){
        resp.status(400)
        throw new Error('User already exists');
    }

    const user=await User.create({
        name,
        email,
        password
    })

    if(user){
        
        generateToken(resp, user._id)

        resp.status(201).json({
            id:user._id,
            name:user.name,
            email:user.name,
            isAdmin:user.isAdmin
        })
    }else{
        resp.status(400);
        throw new Error('Invalid user data')
    }
})



// desc   logout user / clear cookie
// @route POST /api/users/logout
// access private
exports.logoutUser=asyncHandler(async(req,resp)=>{
    resp.cookie('jwt', '',{
        httpOnly:true,
        expires:new Date(0)
    });
    resp.status(200).json({message:"Logged Out Successfully"})
})



// desc   get user profile
// @route get /api/users/profile
// access private
exports.getUserProfile=asyncHandler(async(req,resp)=>{
    const user=await User.findById(req.user._id);

    if(user){
        resp.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin
        })
    }else{
        resp.status(404)
        throw new Error('User Not Found')
    }
})



// desc   update user profile
// @route put /api/users/profile
// access private
exports.updateUserProfile=asyncHandler(async(req,resp)=>{
    // resp.send('update user profile')
    const user=await User.findById(req.user._id)

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password){
            user.password=req.body.password
        }

        const updatedUser=await user.save()

        resp.status(200).json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin
        })
    }
    else{
        resp.status(404)
        throw new Error('User Not Found')
    }
})



// desc   get users
// @route get /api/users
// access private/admin
exports.getUsers=asyncHandler(async(req,resp)=>{
    const users=await User.find({});
    resp.status(200).json(users)
})


// desc   get users by ID
// @route get /api/users/:id
// access private/admin
exports.getUserbyId=asyncHandler(async(req,resp)=>{
    const user=await User.findById(req.params.id).select('-password')

    if(user){
        resp.status(200).json(user)
    }else{
        resp.status(404)
        throw new Error("User Not Found")
    }
})

// desc   delete user 
// @route delete /api/users/:id
// access private/admin
exports.deleteUser=asyncHandler(async(req,resp)=>{
    const user=await User.findById(req.params.id)

    if(user){
        if(user.isAdmin){
            resp.status(400);
            throw new Error("Cannot delete admin user")
        }
        await User.deleteOne({_id:user._id})
        resp.status(200).json({message: "User deleted Successfully"})
    }else{
        resp.status(404)
        throw new Error("User No Found")
    }
})



// desc   update user
// @route put /api/users/:id
// access private/admin
exports.updateUserbyId=asyncHandler(async(req,resp)=>{
    const user=await User.findById(req.params.id)

    if(user){
        user.name=req.body.name || user.name
        user.email=req.body.email || user.email
        user.isAdmin=Boolean(req.body.isAdmin)

        const updatedUser=await user.save()
        resp.status(200).json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            isdmin:updatedUser.isAdmin
        })
    }else{
        resp.status(404)
        throw new Error("User No Found")
    }
})

