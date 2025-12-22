import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { fetchPostById, reactToPost, addComment } from "../utils/api";
import { getCurrentUser } from "../utils/storage";
import "bootstrap/dist/css/bootstrap.min.css";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const currentUser = getCurrentUser();

  useEffect(() => {
    const load = async () => {
        try {
            const data = await fetchPostById(id);
            setPost(data);
        } catch(e) { console.error(e); } 
        finally { setLoading(false); }
    };
    load();
  }, [id]);

  const handleReact = async (type) => {
      if(!currentUser) return alert("Sign in first!");
      try {
          const updated = await reactToPost(id, type);
          setPost(updated);
      } catch(e) { alert(e.message); }
  };

  const handleComment = async (e) => {
      e.preventDefault();
      if(!currentUser) return alert("Sign in first!");
      try {
          const newComments = await addComment(id, comment);
          setPost(prev => ({...prev, feedbacks: newComments}));
          setComment("");
      } catch(e) { alert(e.message); }
  };

  

  if(loading) return <div className="text-center py-5">Loading...</div>;
  if(!post) return <div className="text-center py-5">Post not found</div>;

  const userReacted = post.reactions.usersClicked.find(u => u.userId === currentUser?._id)?.type;

  return (
    <div className="container py-5">
      <div className="row g-5">
        <div className="col-lg-8">
            <div className="shadow p-5 rounded bg-light border-0">
                <h1 className="fw-bold text-success mb-3">{post.title}</h1>
                <div className="d-flex justify-content-between text-muted mb-4 border-bottom pb-3">
                    <span>By {post.author}</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="mb-4 text-justify" style={{ lineHeight: "1.8", whiteSpace: "pre-wrap" }}>
                    {post.body}
                </div>
                <div className="d-flex gap-3 border-top pt-4">
                    <button 
                    onClick={() => handleReact("like")} 
                    className={`btn ${userReacted==="like"?"btn-success":"btn-outline-success"}`}>Like ({post.reactions.likes})</button>
                    <button 
                    onClick={() => handleReact("dislike")} 
                    className={`btn ${userReacted==="dislike"?"btn-danger":"btn-outline-danger"}`}>Dislike ({post.reactions.dislikes})</button>
                    
                  
                    
                </div>
            </div>
        </div>

        <div className="col-lg-4">
            <div className="card shadow border-0 bg-light p-3 sticky-top" style={{top: "90px"}}>
                <h4 className="text-success fw-bold">Comments</h4>
                <form onSubmit={handleComment} className="mb-3">
                    <textarea 
                    className="form-control mb-2" rows="3" 
                    value={comment} 
                    onChange={e => setComment(e.target.value)} 
                    placeholder="Share your thoughts...">

                    </textarea>
                    <button className="btn btn-success w-100" disabled={!comment.trim()}>Post Comment</button>
                </form>
                <div style={{maxHeight: "400px", overflowY: "auto"}}>
                    {post.feedbacks?.map((c, i) => (
                        <div key={i} className="card mb-2 p-3 border-0 shadow-sm">
                            <strong className="text-success small">{c.by}</strong>
                            <p className="mb-0 text-muted small">{c.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;