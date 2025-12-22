import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPosts, reactToPost } from "../utils/api";
import { getCurrentUser } from "../utils/storage";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = getCurrentUser();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleReact = async (id, type) => {
    if (!currentUser) return alert("Please sign in to react.");
    try {
      const updatedPost = await reactToPost(id, type);
      setPosts(posts.map(p => p._id === id ? updatedPost : p));
    } catch (e) {
      alert(e.message);
    }
  };

  const themeBtnStyle = { backgroundColor: "#198754", borderColor: "#198754", color: "white" };

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-success"></div></div>;

  return (
    <div>
      
      <div className="d-flex flex-column justify-content-center align-items-center text-center text-white" 
           style={{ 
             minHeight: "100vh", 
             width: "100%",
             background: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&w=1920&q=80')", 
             backgroundSize: "cover",
             backgroundPosition: "center",
             marginTop: "-80px", 
             paddingTop: "80px"  
           }}>
        
        <h1 className="display-1 fw-bold mb-4">Welcome to MyBlog</h1>
        <p className="lead fs-4 mb-5 opacity-75">Share your stories, ideas, and expertise with the world.</p>
        
        
        <div className="d-flex gap-3">
            <Link to="/createpost" className="btn btn-lg px-5 py-3 rounded-pill fw-bold shadow" style={themeBtnStyle}>
              Start Writing
            </Link>
            <a href="#posts" className="btn btn-lg btn-outline-light px-5 py-3 rounded-pill fw-bold shadow">
              Explore Blog
            </a>
        </div>
      </div>

      
      <div id="posts" className="container py-5">
        <h2 className="fw-bold text-success mb-5 border-bottom pb-2">Trending Topics</h2>
        <div className="row g-4">
          {posts.map(post => {
            const userReacted = post.reactions.usersClicked.find(u => u.userId === currentUser?._id)?.type;
            return (
              <div key={post._id} className="col-lg-6">
                <div className="card h-100 shadow border-0 bg-light">
                  <div className="card-body d-flex flex-column p-4">
                    <h4 className="fw-bold text-success">{post.title}</h4>
                    <p className="text-muted small">By {post.author} | {post.category}</p>
                    <p className="card-text text-truncate">{post.summary}</p>
                    <div className="mt-auto d-flex justify-content-between align-items-center pt-3 border-top">
                        <div className="d-flex gap-2">
                           <button onClick={() => handleReact(post._id, "like")} className={`btn btn-sm ${userReacted === "like" ? "btn-success" : "btn-outline-success"}`}>
                             <i className="bi bi-hand-thumbs-up-fill"></i> {post.reactions.likes}
                           </button>
                           <button onClick={() => handleReact(post._id, "dislike")} className={`btn btn-sm ${userReacted === "dislike" ? "btn-danger" : "btn-outline-danger"}`}>
                             <i className="bi bi-hand-thumbs-down-fill"></i> {post.reactions.dislikes}
                           </button>
                        </div>
                        <Link to={`/post/${post._id}`} className="btn btn-sm text-white fw-bold" style={themeBtnStyle}>Read More</Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;