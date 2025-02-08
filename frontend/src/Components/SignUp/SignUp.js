import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

// Validation Schema
const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  aadhaar: yup
    .string()
    .length(12, "Aadhaar card must be 12 digits")
    .matches(/^[0-9]{12}$/, "Aadhaar card should contain only numbers")
    .required("Aadhaar card is required"),
});

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("https://localhost:44312/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        reset();
        navigate("/"); // Redirect to SignIn page
      } else {
        alert(result.message || "Something went wrong.");
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
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
        <h2 className="signup-title">Sign up</h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="input-group">
            <label>Full name</label>
            <input type="text" placeholder="John Snow" {...register("fullName")} />
            <p className="error">{errors.fullName?.message}</p>
          </div>

          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="your@gmail.com" {...register("email")} />
            <p className="error">{errors.email?.message}</p>
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="********" {...register("password")} />
            <p className="error">{errors.password?.message}</p>
          </div>

          <div className="input-group">
            <label>Aadhaar Card</label>
            <input
              type="text"
              placeholder="Enter 12-digit Aadhaar number"
              {...register("aadhaar")}
            />
            <p className="error">{errors.aadhaar?.message}</p>
          </div>

          <button type="submit" className="signup-button">
            Sign up
          </button>
        </form>

        <p className="signin-text">
          Already have an account? <a href="/" onClick={(e) => {e.preventDefault(); navigate("/");}}>Sign in</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
