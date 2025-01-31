const cloudinary =require("../configs/cloudinary")
const fs =require("fs")

exports.getProfile =(req,resp,next)=>{
    resp.json({message:"Get my user Profile"})
};

exports.updateProfile = async(req,resp)=>{
    try {
        const image = await cloudinary.uploader.upload(req.file.path)
        console.log(image);
        resp.json({message:"My profile updated"})
    } catch (err) {
        next(err)
    } finally {
        if(req.file){
            fs.unlinkSync(req.file.path)
        }
    }
   
};