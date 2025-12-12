import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginSchema } from "../utils/validators";
import { loginUser } from "../utils/api"; 
import { saveSession } from "../utils/storage";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setMessage({ type: "", text: "" });

    const result = loginSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((err) => fieldErrors[err.path[0]] = err.message);
      setErrors(fieldErrors);
      return;
    }

    try {
      const data = await loginUser(form.email, form.password);
      saveSession({ _id: data._id, name: data.name, email: data.email }, data.token);
      onLogin && onLogin(data);
      setMessage({ type: "success", text: "Login successful!" });
      setTimeout(() => navigate("/"), 500);
    } catch (err) {
      setMessage({ type: "danger", text: err.message });
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card p-4 shadow-lg border-0 bg-light">
            <h2 className="card-title text-center mb-4 fw-bold text-success">Welcome Back</h2>
            {message.text && <div className={`alert alert-${message.type}`}>{message.text}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>

                <input 
                type="email" 
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                value={form.email} 
                onChange={(e) => setForm({ ...form, email: e.target.value })} 
                
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              <div className="mb-4">
                <label className="form-label fw-semibold">Password</label>
                
                <input 
                type="password" 
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                value={form.password} 
                onChange={(e) => setForm({ ...form, password: e.target.value })} 
                
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
              <button type="submit" className="btn btn-success w-100 fw-bold py-2">Login</button>
            </form>
            <div className="text-center mt-4">
               <small>Don’t have an account? <Link to="/signup" className="text-success fw-semibold">Sign Up</Link></small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;