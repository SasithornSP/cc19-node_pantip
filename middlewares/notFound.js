const notFound = (req,resp,next)=>{
    resp.status(404).json({massage:"Not Found"})
}

module.exports=notFound;