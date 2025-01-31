const express =require("express")
// const createError =require("../utils/createError")
const authController =require("../controllers/auth-controllers")
const router = express.Router();


// router.post("/register",(req,resp,next)=>{
//     try {
//     const{email,password} = req.body;

//     if(!email || !password){
//        return createError(400,"Email and Password are required")
//     }
//     resp.json({message:"Register"})
//     } catch (err) {
//         next(err);
//     }
// });

// router.post("/login",(req,resp)=>{
//     resp.json({message:"Login"})
// })
router.post("/register",authController.register);

router.post("/login",authController.login)


module.exports=router;