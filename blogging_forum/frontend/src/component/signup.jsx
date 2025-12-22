import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signupSchema } from "../utils/validators";
import { registerUser } from "../utils/api";
import { saveSession } from "../utils/storage";
import "bootstrap/dist/css/bootstrap.min.css";

const Signup = ({ onSignup }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setMessage({ type: "", text: "" });

    const result = signupSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((err) => fieldErrors[err.path[0]] = err.message);
      setErrors(fieldErrors);
      return;
    }

    try {
      const data = await registerUser(form.name, form.email, form.password);
      saveSession({ _id: data._id, name: data.name, email: data.email }, data.token);
      onSignup && onSignup(data);
      setMessage({ type: "success", text: "Registration successful!" });
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setMessage({ type: "danger", text: err.message });
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card p-4 shadow-lg border-0 bg-light">
            <h2 className="card-title text-center mb-4 fw-bold text-success">Create Account</h2>
            {message.text && <div className={`alert alert-${message.type}`}>{message.text}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Name</label>


                <input 
                type="text" 
                name="name" 
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                value={form.name} 
                onChange={handleChange} 
                />

                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>

                <input 
                type="email" 
                name="email" 
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                value={form.email} 
                onChange={handleChange} 
                />

                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Password</label>
                <input 
                type="password" 
                name="password" 
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                value={form.password} 
                onChange={handleChange} 
                />

                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
              <div className="mb-4">
                <label className="form-label fw-semibold">Confirm Password</label>
                <input 
                type="password" 
                name="confirm" 
                className={`form-control ${errors.confirm ? "is-invalid" : ""}`}
                value={form.confirm} 
                onChange={handleChange}
                
                />
                {errors.confirm && <div className="invalid-feedback">{errors.confirm}</div>}
              </div>
              <button type="submit" className="btn btn-success w-100 fw-bold py-2">Sign Up</button>
            </form>
            <p className="text-center mt-4"><small>Already have an account? <Link to="/login" className="text-success fw-semibold">Login</Link></small></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;