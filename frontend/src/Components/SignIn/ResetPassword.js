import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./ResetPassword.css";

const schema = yup.object().shape({
  newPassword: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: yup.string().oneOf([yup.ref("newPassword"), null], "Passwords must match").required("Confirm Password is required"),
});

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

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
      const response = await fetch("https://localhost:44312/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: data.newPassword }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Password reset successful! You can now sign in.");
        setTimeout(() => navigate("/signin"), 2000);
      } else {
        setError(result.message || "Something went wrong.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-box">
        <h1>CollabZone</h1>
        <h2>Reset Password</h2>
        <p>Enter your new password.</p>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="input-group">
            <label>New Password</label>
            <input type="password" placeholder="********" {...register("newPassword")} />
            <p className="error">{errors.newPassword?.message}</p>
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="********" {...register("confirmPassword")} />
            <p className="error">{errors.confirmPassword?.message}</p>
          </div>

          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="reset-password-button" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
