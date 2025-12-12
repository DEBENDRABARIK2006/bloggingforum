const Post = require("../models/Post");


const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const createPost = async (req, res) => {
  try {
    const { title, summary, body, category, tags } = req.body;
    
    const post = await Post.create({
      title,
      summary,
      body,
      author: req.user.name,
      category,
      tags,
      user: req.user.id, 
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    await post.deleteOne();
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const reactToPost = async (req, res) => {
    try {
        const { type } = req.body; 
        const post = await Post.findById(req.params.id);

        if (!post) return res.status(404).json({ message: "Post not found" });

        
        const existingReaction = post.reactions.usersClicked.find(
            (r) => r.userId.toString() === req.user.id
        );

        if (existingReaction) {
           
            if (existingReaction.type === type) {
                if (type === 'like') post.reactions.likes--;
                if (type === 'dislike') post.reactions.dislikes--;
                
                
                post.reactions.usersClicked = post.reactions.usersClicked.filter(
                    (r) => r.userId.toString() !== req.user.id
                );
            } else {
                
                if (type === 'like') {
                    post.reactions.likes++;
                    post.reactions.dislikes--;
                } else {
                    post.reactions.dislikes++;
                    post.reactions.likes--;
                }
                existingReaction.type = type;
            }
        } else {
            
            if (type === 'like') post.reactions.likes++;
            if (type === 'dislike') post.reactions.dislikes++;
            
            post.reactions.usersClicked.push({ userId: req.user.id, type });
        }

        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const addComment = async (req, res) => {
    try {
        const { text } = req.body;
        const post = await Post.findById(req.params.id);

        if(!post) return res.status(404).json({ message: "Post not found"});

        const comment = {
            text,
            by: req.user.name,
            userId: req.user.id,
        };

        post.feedbacks.unshift(comment); 
        await post.save();
        res.status(201).json(post.feedbacks);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getPosts, getPostById, createPost, deletePost, reactToPost, addComment };