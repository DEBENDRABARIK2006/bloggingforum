import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPosts, deletePost } from "../utils/api";
import { getCurrentUser } from "../utils/storage";

const OwnPosts = () => {
  const [posts, setPosts] = useState([]);
  const currentUser = getCurrentUser();

  useEffect(() => {
    const load = async () => {
        const all = await fetchPosts();
        
        const myPosts = all.filter(p => p.user === currentUser?._id);
        setPosts(myPosts);
    };
    if(currentUser) load();
  }, [currentUser]);

  const handleDelete = async (id) => {
      if(window.confirm("Delete post?")) {
          await deletePost(id);
          setPosts(prev => prev.filter(p => p._id !== id));
      }
  };

  return (
    <div className="container py-5">
      <h2 className="text-success fw-bold mb-4">My Posts</h2>
      <div className="row">
        {posts.length === 0 ? <p>No posts found.</p> : posts.map(p => (
            <div key={p._id} className="col-md-6 mb-4">
                <div className="card shadow border-0 bg-light h-100 p-3">
                    <h5 className="fw-bold text-success">{p.title}</h5>
                    <p className="text-muted">{p.summary}</p>
                    <div className="d-flex justify-content-between mt-auto">
                        <Link to={`/post/${p._id}`} className="btn btn-sm btn-outline-success">View</Link>
                        <button onClick={() => handleDelete(p._id)} className="btn btn-sm btn-outline-danger">Delete</button>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default OwnPosts;