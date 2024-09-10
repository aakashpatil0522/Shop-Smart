const jwt=require('jsonwebtoken');
const asyncHandler=require('./asyncHandler');
const User=require('../model/userModel');

const protect=asyncHandler(async(req,resp,next)=>{
    let token;

    // Read jwt from the cookie
    token=req.cookies.jwt
    if(token){
        try{
            const decoded=jwt.verify(token,process.env.SECRET_KEY)
            req.user=await User.findById(decoded.userId).select('-password');
            next()
        }catch(error){
            resp.status(401);
            throw new Error("Not authorised, Token failed");
        }
    }else{
        resp.status(401)
        throw new Error("Not authorised, no token");
    }
})


// Admin Middleware
const admin=(req,resp,next)=>{
    if(req.user && req.user.isAdmin){
        next()
    }else{
        resp.status(401);
        throw new Error("Not authorised as a admin")
    }
}

module.exports={ protect, admin };