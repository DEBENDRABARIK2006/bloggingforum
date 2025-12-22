const API_URL = "http://localhost:5000/api";

// --- HELPERS ---
const getHeaders = () => {
  const token = localStorage.getItem("blog_token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// --- AUTH ---
export const loginUser = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Login failed");
  }
  return res.json();
};

export const registerUser = async (name, email, password) => {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Signup failed");
  }
  return res.json();
};

// --- POSTS ---
export const fetchPosts = async () => {
  const res = await fetch(`${API_URL}/posts`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
};

export const fetchPostById = async (id) => {
  const res = await fetch(`${API_URL}/posts/${id}`);
  if (!res.ok) throw new Error("Post not found");
  return res.json();
};

export const createNewPost = async (postData) => {
  const res = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(postData),
  });
  if (!res.ok) throw new Error("Failed to create post");
  return res.json();
};

export const deletePost = async (id) => {
  const res = await fetch(`${API_URL}/posts/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete");
  return res.json();
};

// --- INTERACTIONS ---
export const reactToPost = async (id, type) => {
  const res = await fetch(`${API_URL}/posts/${id}/react`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ type }),
  });
  if (!res.ok) throw new Error("Failed to react");
  return res.json();
};

export const addComment = async (id, text) => {
  const res = await fetch(`${API_URL}/posts/${id}/comment`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error("Failed to comment");
  return res.json();
};