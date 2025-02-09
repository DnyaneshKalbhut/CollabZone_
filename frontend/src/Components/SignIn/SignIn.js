import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./SignIn.css";
import DashBoard from "../DashBoard/DashBoard";

import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const SignIn = ({ setUserData }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await fetch("https://localhost:44312/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      if (response.ok) {
        
        setUserData(result.user);
        localStorage.setItem("userEmail", result.user.email); // Store email in localStorage
        setIsAuthenticated(true);
      } else {
        setErrorMessage(result.message || "Invalid credentials");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
    setLoading(false);
  };
  
  

  if (isAuthenticated) {
    return <DashBoard />;
  }

  return (
    <div className="signin-container">
      <div className="signin-box">
      <h1>
          <span className="c">C</span>
          <span className="o">o</span>
          <span className="l">l</span>
          <span className="l">l</span>
          <span className="a">a</span>
          <span className="b">b</span>
          <span className="z">Z</span>
          <span className="o2">o</span>
          <span className="n">n</span>
          <span className="e">e</span>
        </h1>
        <h2 className="signin-title">Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="your@gmail.com" {...register("email")} />
            <p className="error">{errors.email?.message}</p>
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="your password" {...register("password")} />
            <p className="error">{errors.password?.message}</p>
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit" className="signin-button" disabled={loading}>
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>

        <p className="signup-text">
          Don't have an account? <a href="/signup" onClick={(e) => { e.preventDefault(); navigate("/signup"); }}>Sign up</a>
        </p>
     
      </div>
    </div>
  );
};

export default SignIn;