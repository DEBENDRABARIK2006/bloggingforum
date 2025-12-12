import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNewPost } from "../utils/api";
import "bootstrap/dist/css/bootstrap.min.css";

const CreatePost = ({ currentUser }) => {
  const [form, setForm] = useState({ title: "", summary: "", body: "", category: "", tags: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tagsArray = form.tags.split(",").map(t => t.trim()).filter(Boolean);
      await createNewPost({ ...form, tags: tagsArray });
      navigate("/");
    } catch (e) {
      alert("Error creating post: " + e.message);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h2 className="text-center fw-bold text-success mb-4">Create a New Masterpiece</h2>
          <form onSubmit={handleSubmit} className="card p-4 border-0 shadow bg-light">
            <div className="mb-3">
              <label className="fw-bold">Title</label>

              <input required className="form-control" 
              value={form.title} 
              onChange={e => setForm({...form, title: e.target.value})}
              />

            </div>
            <div className="mb-3">
              <label className="fw-bold">Summary</label>

              <textarea required className="form-control" rows={2} 
              value={form.summary} 
              onChange={e => setForm({...form, summary: e.target.value})} 
              
              />

            </div>
            <div className="mb-3">
              <label className="fw-bold">Content</label>

              <textarea required className="form-control" 
              rows={6} 
              value={form.body} 
              onChange={e => setForm({...form, body: e.target.value})} 
              />

            </div>
            <div className="row mb-3">
                <div className="col">
                    <label className="fw-bold">Category</label>

                    <input required className="form-control" 
                    value={form.category} 
                    onChange={e => setForm({...form, category: e.target.value})} 
                    />

                </div>
                <div className="col">
                    <label className="fw-bold">Tags (comma separated)</label>
                    <input className="form-control" 
                    value={form.tags} 
                    onChange={e => setForm({...form, tags: e.target.value})} />
                </div>
            </div>
            <button className="btn btn-success w-100 fw-bold">Publish Post</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;