const postServices = require("../services/postServices");

/* Create Post */
exports.createPost = async (req, res) => {
  try {
    const { post } = await postServices.createPost(req.body, req);
    res.status(201).json({
      message: "Post Created Successfully",
      post,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

/* Get All Posts */
exports.getAllPost = async (req, res) => {
  try {
    const { posts } = await postServices.getAllPosts();
    res.status(200).json({
      message: "Posts Fetched Successfully",
      posts,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

/* Get Single Post */
exports.getSinglePost = async (req, res) => {
  try {
    const postId = req.params.id;
    if (!postId) {
      return res.status(400).json({
        message: "Post Id Is Missing",
      });
    }

    const { post } = await postServices.getPostById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post Not Found",
      });
    }

    res.status(200).json({
      message: "Post Fetched Successfully",
      post,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

/* Update Post */
exports.updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedData = req.body;

    if (!postId) {
      return res.status(400).json({
        message: "Post Id Is Missing",
      });
    }

    const { post } = await postServices.updatePost(updatedData, postId);
    if (!post) {
      return res.status(404).json({
        message: "Post Not Found Or Post Isn't Updated",
      });
    }

    res.status(200).json({
      message: "Post Updated Successfully",
      post,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

/* Delete Post */
exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    if (!postId) {
      return res.status(400).json({
        message: "Post Id Is Missing",
      });
    }

    const deleted = await postServices.deletePost(postId);
    if (!deleted) {
      return res.status(404).json({
        message: "Post Not Found",
      });
    }

    res.status(200).json({
      message: "Post Is Deleted Successfully",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};