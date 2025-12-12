const express = require("express");
const router = express.Router();
const { 
    getPosts, getPostById, createPost, deletePost, reactToPost, addComment 
} = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");


router.get("/", getPosts);
router.get("/:id", getPostById);


router.post("/", protect, createPost);
router.delete("/:id", protect, deletePost);
router.post("/:id/react", protect, reactToPost);
router.post("/:id/comment", protect, addComment);

module.exports = router;