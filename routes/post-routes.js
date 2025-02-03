const express=require("express")
const authenticate =require("../middlewares/authenticate")
const postControllers = require("../controllers/post-controllers")
const router = express.Router();

// const {id}=req.

// router.get("/",(req,resp)=>{
//     resp.json({message:"Send post list"})
// });

// router.post("/",authenticate,(req,resp)=>{
//     resp.json({message:"Create post"})
// });

// router.put("/",authenticate,(req,resp)=>{
//     resp.json({message:"Update post"})
// });

// router.patch("/",authenticate,(req,resp)=>{
//     resp.json({message:"Update post 2"})
// });

// router.delete("/",authenticate,(req,resp)=>{
//     resp.json({message:"Delete post"})
// });
//----------------------------------------------


router.get('/list/:category',postControllers.getPostList)
router.get("/:id",postControllers.getPost);

router.post("/",authenticate,postControllers.createPost);

router.put("/:id",authenticate,postControllers.updatePost);

router.patch("/",authenticate,postControllers.updatePost);

router.delete("/:id",authenticate,postControllers.deletePost);
router.post("/:id/comment",authenticate,postControllers.commentPost)
router.put("/comment/:commentId",authenticate,postControllers.updateCommentPost)
router.delete("/comment/:commentId",authenticate,postControllers.deleteComment)

module.exports =router;