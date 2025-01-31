const express = require("express")
const authenticate =require("../middlewares/authenticate")
const cloudinary =require("../configs/cloudinary")
const fs =require("fs")
const upload =require("../middlewares/Upload")
const router = express.Router();
const userController =require("../controllers/user-controllers")


// router.get("/",authenticate,(req,resp)=>{
//     resp.json({message:"Get my user profile"})
// })
router.get("/",authenticate,userController.getProfile)

//upload
router.put("/",authenticate,upload.single("profile"),userController.updateProfile);

module.exports=router;