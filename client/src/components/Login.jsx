import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/login.css";
import robot from "../images/robot.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const [formData, setFormData] = useState({
    email1: "",
    pwd1: "",
  });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    // Basic validation
    if (!formData.email1 || !formData.pwd1) {
      setErrors(["Please fill in all fields."]);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/login",
        formData
      );

      if (response.data.status) {
        const user = response.data.user;
        localStorage.setItem("email", user.email);
        localStorage.setItem("name", user.name);
        navigate("/chat"); // Adjust the redirect path as needed
      } else {
        setErrors([response.data.error || "An unknown error occurred."]);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors([error.response.data.error]);
      } else {
        setErrors(["An unknown error occurred."]);
      }
    }
  };

  return (
    <div className="text-center">
      <div style={{ marginTop: 200 }}></div>
      <form className="form-signin" onSubmit={handleSubmit}>
        <img
          className="mb-4"
          style={{ marginLeft: "auto", marginRight: "auto" }}
          src={robot}
          alt=""
          width="72"
          height="72"
        />
        <h1 className="h3 mb-3 font-weight-normal " style={{ color: "#fff" }}>
          Please sign in
        </h1>
        {/* Display Validation errors over here */}
        {errors.length > 0 && (
          <div className="alert alert-danger">
            {errors.map((error, index) => (
              <span key={index}>{error}</span>
            ))}
            <span className="closebtn" onClick={() => setErrors([])}>
              &times;
            </span>
          </div>
        )}
        <label htmlFor="inputEmail" className="sr-only">
          Email address
        </label>
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
          name="email1"
          value={formData.email1}
          onChange={handleChange}
        />
        <div style={{ marginTop: 20 }}></div>
        <label htmlFor="inputPassword" className="sr-only">
          Password
        </label>
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          name="pwd1"
          value={formData.pwd1}
          onChange={handleChange}
        />
        <div style={{ marginTop: 20 }}></div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Sign in
        </button>
        <br />
        <p className="text-center " style={{ color: "white" }}>
          Don't have an account? <a href="register">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
