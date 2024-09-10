
// This code is for When User tries to access URL, that doesn't exist
const notFound=(req,resp,next)=>{
    const error=new Error(`Not Found- ${req.originalUrl}`);
    resp.status(404);
    next(error)
}

const errorHandler=(err,req,resp,next)=>{
    let statusCode= resp.statusCode === 200 ? 500 : resp.statusCode
    let message=err.message

    if(err.name==='CastError' && err.kind==='ObjectId'){
        message=`Product Not Found`
        statusCode=404;
    }

    resp.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV==='production' ? '@' : err.stack
    })
}

module.exports = { notFound, errorHandler };