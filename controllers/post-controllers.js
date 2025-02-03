const createError = require("../utils/createError");
const prisma = require("../configs/prisma");
const postService =require("../services/post-services");
const { connect } = require("../routes/post-routes");

exports.getPostList = async (req, resp, next) => {
  const { category } = req.params;
  const { page = 1, limit = 25 } = req.query;

  if (!category) {
    return createError(400, "Category to be provided");
  }

  if (isNaN(Number(page)) || isNaN(Number(limit))) {
    return createError(400, "Invalid type for page or limit");
  }

  const skip = (Number(page) - 1) * Number(limit);
  console.log(category);
  const posts = await prisma.post.findMany({
    where: {
      category: {
        name: category,
      },
    },
    include: {
      tags: true,
      user: {
        select: { id: true, firstName: true, lastName: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: skip,
    take: Number(limit),
  });
  console.log(posts);
  resp.status(200).json({ posts });
};

exports.getPost = async (req, resp, next) => {
  const { id } = req.params;

  if (!id) {
    return createError(400, "Post id to provided");
  }

  if (isNaN(Number(id))) {
    return createError(400, "Invalid id");
  }
  const post = await postService.getPostById(id);

  resp.json({ post});
};

exports.createPost = async (req, resp, next) => {
  try {
    const { title, content, category, userId, tags } = req.body;

    if (!title) {
      return createError(400, "Title to be provided");
    }
    if (!content) {
      return createError(400, "Content to be provided");
    }
    if (typeof title !== "string" || typeof content !== "string") {
      return createError(400, "Invalid title or content type");
    }
    if (!category) {
      return createError(400, "Category to be provided");
    }
    if (typeof category !== "string") {
      return createError(400, "category should be string");
    }
    if (!Array.isArray(tags)) {
      return createError(400, "Tags should be array");
    }

    for (let el of tags) {
      if (typeof el !== "string") {
        return createError(400, "Tag should be string");
      }
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        user: {
          connect: {
            id: userId,
          },
        },
        category: {
          connect: {
            name: category,
          },
        },
        tags: {
          connectOrCreate: tags.map((el) => ({
            where: { name: el.toLowerCase() },
            create: { name: el.toLowerCase() },
          })),
        },
      },
      include: {
        category: true,
        tags: true,
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    resp.json({ post: newPost });
  } catch (err) {
    next(err);
  }
};

exports.updatePost = async(req, resp, next) => {
  const {id} = req.params;
  const {title,content,userId,tags} = req.body;

  if(!id){
    return createError(400,"Id to be provideds")
  }
  if(!title){
    return createError(400,"Title to be provideds")
  }
  if(!content){
    return createError(400,"Content to be provideds")
  }
  if(!userId){
    return createError(400,"User id to be provideds")
  }
  if(
    typeof title !=="string" ||
    typeof content !=="string" ||
    typeof userId !=="number"
  ){
    return createError(400,"Invalid typeof title,content or userId")
  }
  if(!Array.isArray(tags)){
    return createError(400,"Tags should be arrays")
  }

  for(let el of tags){
    if (typeof el !=="string"){
      return createError(400,"Invalid typeof tags")
    }
  }

  const post = await postService.getPostById(id)

  if (!post){
    return createError(400,"Post not Found")
  }
  if(post.userId !== userId){
    return createError(403,"Forbidden")
  }
  // const tagPromiseArray = tags.map((el)=>{
  //   return prisma.tag.findFirst({
  //     where:{
  //       name:el,
  //     },
    
  //   });
  // });
  // const tagArray = await Promise.all(tagPromiseArray);

  // const toCreateTags = tags.filter(
  //   (tag)=>!tagArray.find((el)=>el?.name ===el))

  //   await prisma.tag.createMany({
  //     data:toCreateTags.map((el)=>({name:el}))
  //   })
  //   await prisma.post.update({
  //     where:{
  //       id:post.id
  //     },
  //     data:{
  //       title,
  //       content,
  //       tags:{
  //         connect: tags.map((el)=>({name:el}))
  //       }
  //     },
  //     include:{
  //       tags:true,
  //     }
  //   })
    const updatedPost = await prisma.post.update({
      where:{
        id:post.id
      },
      data:{
        title,
        content,
        tags:{
          connectOrCreate: tags.map((el)=>({
            where:{name:el},
          create:{name:el}
        })),
        }
      },
      include:{
        tags:true,
      }
    })
  resp.json({ post: updatedPost });
};

exports.deletePost = async(req, resp, next) => {
  const {id} =require.params;

  if(!id){
    return createError("Id to be provided")
  }
  const post = await postService.getPostById(id);

  if (userId !== post.userId){
    return createError(403,"Forbidden")
  }
  await prisma.post.delete({
    where:{
      id:post.id
    }
  })
  resp.json({ message: "Delete Post" });
};
