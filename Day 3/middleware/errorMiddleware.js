const errorMiddleware =(error,req,res,next)=>{
 error.message =error.message || 'internal server error'
 error.statusCode = error.statusCode || 500

 res.status(error.statusCode).json({success:false,message:error.message})
}
module.exports = errorMiddleware