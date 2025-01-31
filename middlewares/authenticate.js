
const authenticate =(req,resp,next)=>{
    req.user = {id:1};
    next();
};

module.exports = authenticate;