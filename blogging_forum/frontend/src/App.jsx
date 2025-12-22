// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from "react-router-dom";

import Header from "./component/Header";
import Footer from "./component/footer";
import Home from "./component/home";
import PostDetail from "./component/postdetails";
import Login from "./component/login";
import Signup from "./component/signup";
import CreatePost from "./component/createpost";
import OwnPosts from "./component/ownposts";
import ProtectedRoute from "./component/protectedroute";
import { getCurrentUser, signOutUser } from "./utils/storage";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function AppWrapper() {
const [user, setUser] = useState(getCurrentUser());
const navigate = useNavigate();

useEffect(() => {
const handleStorageChange = () => {
setUser(getCurrentUser());
};
window.addEventListener("storage", handleStorageChange);
return () => window.removeEventListener("storage", handleStorageChange);
}, []);

const handleSignOut = () => {
signOutUser();
setUser(null);
navigate("/login");
};

const handleLogin = (loggedInUser) => {
setUser(loggedInUser);
};

const handleSignup = (newUser) => {
setUser(newUser);
};

return (
<>
<div style={{ position: "sticky", top: 0, zIndex: 1030 }}> <Header user={user} onSignOut={handleSignOut} /> </div>


  <main style={{ minHeight: "75vh" }}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post/:id" element={<PostDetail />} />

      <Route path="/login" element={user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
      <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup onSignup={handleSignup} />} />

      <Route
        path="/createpost"
        element={
          <ProtectedRoute user={user}>
            <CreatePost currentUser={user} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ownposts"
        element={
          <ProtectedRoute user={user}>
            <OwnPosts currentUser={user} />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </main>

  <Footer />
</>


);
}

export default function App() {
return ( <Router> <AppWrapper /> </Router>
);
}
