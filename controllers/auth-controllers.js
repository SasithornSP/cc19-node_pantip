const createError = require("../utils/createError")

exports.register =(req,resp,next)=>{
    try {
        const{email,password} = req.body;
    
        if(!email || !password){
           return createError(400,"Email and Password are required")
        }
        resp.json({message:"Register"})
        } catch (err) {
            next(err);
        }
    };

exports.login =(req,resp,next)=>{
    try {
        const{email,password} = req.body;
    
        if(!email || !password){
           return createError(400,"Email and Password are required")
        }
        resp.json({message:"login"})
        } catch (err) {
            next(err);
        }
    };
    
    // router.post("/login",(req,resp)=>{
    //     resp.json({message:"Login"})
    // })


