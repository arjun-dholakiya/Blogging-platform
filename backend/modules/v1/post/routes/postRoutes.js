const postControllers = require("../controllers/postControllers");

const express = require("express");
const router = express.Router();
const authMiddleware = require("../../../../middleware/authMiddleware");

router.post("/create-post",authMiddleware,postControllers.createPost);
router.get("/fetchAll-post",authMiddleware,postControllers.getAllPost);
router.get("/fetchSingle-post/:id",authMiddleware,postControllers.getSinglePost);
router.put("/update-post/:id",authMiddleware,postControllers.updatePost);
router.delete("/delete-post/:id",authMiddleware,postControllers.deletePost);

module.exports = router;
