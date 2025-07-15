import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../App.css';

function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/users/login", {
        email: form.email,
        password: form.password,
      });
      localStorage.setItem("token", data.token);
      setMessage("");
      navigate("/home");
    } catch (err) {
      setMessage("Invalid credentials or user not found");
    }
  };

  const handleSignup = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      setMessage("Signup successful. Please login.");
      setIsSignup(false);
      setForm({ name: "", email: "", password: "" });
    } catch {
      setMessage("User already exists");
    }
  };

  return (
    <div className="login-bg">
  <div className="glass-card">
    <div style={{ maxWidth: 300, margin: "100px auto", border: "1px solid #ccc", padding: 20, borderRadius: 10 }}>
      <h2>{isSignup ? "Sign Up" : "Login"}</h2>
      <form onSubmit={isSignup ? handleSignup : handleLogin}>
        {isSignup && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            style={{display: "block", marginBottom: 10, width: "100%"}}
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{display: "block", marginBottom: 10, width: "100%"}}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          style={{display: "block", marginBottom: 10, width: "100%"}}
        />
        <button type="submit" style={{width: "100%", marginBottom: 10}}>
          {isSignup ? "Sign Up" : "Login"}
        </button>
        <div style={{ color: "red" }}>{message}</div>
      </form>
      {!isSignup && (
        <p>
          Don't have a account?{" "}
          <button onClick={() => setIsSignup(true)} style={{ color: "blue", background: "none", border: "none" }}>
            Sign Up
          </button>
        </p>
      )}
      {isSignup && (
        <p>
          Already have an account?{" "}
          <button onClick={() => setIsSignup(false)} style={{ color: "blue", background: "none", border: "none" }}>
            Login
          </button>
        </p>
      )}
    </div>
      </div>
</div>
  );
}

export default LoginPage;