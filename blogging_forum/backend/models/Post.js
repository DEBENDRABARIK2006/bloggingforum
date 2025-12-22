const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({
  text: { type: String, required: true },
  by: { type: String, required: true }, 
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now }
});

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  tags: [String],
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" }, 
  
  
  reactions: {
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    
    usersClicked: [{ 
      userId: { type: mongoose.Schema.Types.ObjectId }, 
      type: { type: String, enum: ['like', 'dislike'] } 
    }]
  },
  

  feedbacks: [feedbackSchema]
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);