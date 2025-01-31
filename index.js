// การสร้างsever ด้วย xpress
require('dotenv').config()
const express = require("express");

const authenticate = require("./middlewares/authenticate")
// const cloudinary =require("./configs/cloudinary")
// const fs =require("fs")

const postRoute = require("./routes/post-routes")
const userRoute = require("./routes/user-routes")
const authRoute = require("./routes/auth-routes")
// const upload =require("./middlewares/Upload")

const errorHandler = require("./middlewares/error")

const cors = require("cors")
const notFoundHandler = require("./middlewares/notFound")


const app = express();
//ใช้อ่านbody expressเป็นmiddleware
app.use(express.json());

app.use(cors());

// app.get("/post/list",(req,resp)=>{
//     resp.json({message:"Send post list"})
// });


// app.post("/",authenticate,(req,resp)=>{
//     resp.json({message:"Create post"})
// });

// app.put("/",authenticate,(req,resp)=>{
//     resp.json({message:"Update post"})
// });

// app.patch("/",authenticate,(req,resp)=>{
//     resp.json({message:"Update post 2"})
// });

// app.delete("/",authenticate,(req,resp)=>{
//     resp.json({message:"Delete post"})
// });



// //post list1
// app.get("/post/list",(req,resp)=>{
//     resp.status(200).json({message:"Send post list"})
// });
// //post inlist1
// app.get("/post/:id",(req,resp)=>{
//     const {id}=req.params;
//     resp.json({postId:id})
// });

// app.get("/product/price/:price/discount/:discount",(req,resp)=>{
//     const { price,discount } =req.params;
//     resp.json({price:price,discount:discount})
// })

// app.post("/products",(req,resp)=>{
//     const {order,page,limit}=req.body;
//     resp.json({order,page,limit})
// })

//-------------------------------------------------

app.use("/post",postRoute);
app.use("/user",userRoute);
app.use("/auth",authRoute);

app.use(errorHandler)

// app.get("/user",authenticate,(req,resp)=>{
//     resp.json({message:"Get my user profile"})
// })

// //upload
// app.put("/user",authenticate,upload.single("profile"),async(req,resp)=>{
//     try {
//         const image = await cloudinary.uploader.upload(req.file.path)
//         console.log(image);
//         resp.json({message:"My profile updated"})
//     } catch (error) {
//         console.log(error);
//     } finally {
//         if(req.file){
//             fs.unlinkSync(req.file.path)
//         }
//     }
   
// });

// app.post("/auth/register",(req,resp)=>{
//     resp.json({message:"Register"})
// });
// app.post("/auth/login",(req,resp)=>{
//     resp.json({message:"Login"})
// })

app.use(notFoundHandler)

app.listen("8000",()=>console.log("sever is running on port 8000"));

