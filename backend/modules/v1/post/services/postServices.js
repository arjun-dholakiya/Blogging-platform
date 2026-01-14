const {Post} = require("../../../../database/models");

/* Create Post */
exports.createPost = async (data,req) => {
  
    const{
        title,
        content
    }=data;

    if (!title || !content) {
        throw new Error("Please Enter Title & Content");
    }

    if (!req.user || !req.user.id) {
        throw new Error("Invalid User or Token");
    }

    const post = await Post.create({
        title,
        content,
        userId:req.user.id
    })

    return {post};
}

/* Get ALl Post */
exports.getAllPosts = async () => {
  const posts = await Post.findAll({
    attributes : ['id','title','content','userId','createdAt','updatedAt']
  })
  return {posts};
}

/* Get Single Post */
exports.getPostById = async (postId) => {
    const post = await Post.findOne({
        where:{id:postId},
        attributes : ['id','title','content','userId','createdAt','updatedAt']
    })
    return {post};
}

/* Update Post */
exports.updatePost = async (data,postId) => {
  const post = await Post.update(data,{
    where:{id:postId},
  })
  return {post};
}

/* Delete Post */
exports.deletePost = async (postId) => {
  const post = await Post.destroy({
    where:{id:postId}
  });
  return {post};
}



