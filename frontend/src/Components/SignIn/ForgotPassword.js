import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";


const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("https://localhost:44312/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Password reset link sent to your email.");
      } else {
        setError(result.message || "Something went wrong.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h1>CollabZone</h1>
        <h2>Forgot Password</h2>
        <p>Enter your email to receive a password reset link.</p>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="your@gmail.com" {...register("email")} />
            <p className="error">{errors.email?.message}</p>
          </div>

          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="forgot-password-button" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="back-to-signin">
          <a href="/signin" onClick={(e) => { e.preventDefault(); navigate("/signin"); }}>Back to Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
