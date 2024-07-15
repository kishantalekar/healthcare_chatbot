import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/register.css";
import { useNavigate } from "react-router-dom";
import { Toast } from "bootstrap";
import axios from "axios";
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email1: "",
    phone: "",
    pwd1: "",
    pwd2: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    // Basic validation
    if (
      !formData.name ||
      !formData.email1 ||
      !formData.phone ||
      !formData.pwd1 ||
      !formData.pwd2
    ) {
      setErrors(["Please fill in all fields."]);
      return;
    }

    if (formData.pwd1 !== formData.pwd2) {
      setErrors(["Passwords do not match."]);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/register",
        formData
      );

      if (response.status === 201) {
        console.log(response);
        navigate("/login");
      } else {
        setErrors(["Registration failed. Please try again."]);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        setErrors([error.response.data.error]);
      } else {
        setErrors(["An unknown error occurred."]);
      }
    }
  };

  return (
    <div
      className="container"
      style={{
        maxWidth: "400px",
        margin: "0 auto",
      }}
    >
      <div className="card-body">
        <h4 className="card-title mt-3 text-center">Create Account</h4>

        <form name="form1" onSubmit={handleSubmit}>
          {/* Display Validation errors over here */}
          {errors.length > 0 && (
            <div className="alert">
              {errors.map((error, index) => (
                <span key={index}>{error}</span>
              ))}
              <span className="closebtn" onClick={() => setErrors([])}>
                &times;
              </span>
            </div>
          )}
          <div className="form-group input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                {" "}
                <i className="fa fa-user"></i>{" "}
              </span>
            </div>
            <input
              className="form-control"
              placeholder="Full name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>{" "}
          {/* form-group// */}
          <div className="form-group input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                {" "}
                <i className="fa fa-envelope"></i>{" "}
              </span>
            </div>
            <input
              className="form-control"
              placeholder="Email address"
              type="text"
              name="email1"
              value={formData.email1}
              onChange={handleChange}
            />
          </div>{" "}
          {/* form-group// */}
          <div className="form-group input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                {" "}
                <i className="fa fa-phone"></i>{" "}
              </span>
            </div>
            <select
              id="selectCountryCode"
              className="custom-select"
              style={{ maxWidth: "120px" }}
            >
              {/* Add options here */}
              <option>+91</option>
              <option>+91</option>
              <option>+91</option>
            </select>
            <input
              className="form-control"
              placeholder="Mobile Number"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>{" "}
          {/* form-group// */}
          <div className="form-group input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                {" "}
                <i className="fa fa-lock"></i>{" "}
              </span>
            </div>
            <input
              className="form-control"
              placeholder="Create password"
              type="password"
              name="pwd1"
              value={formData.pwd1}
              onChange={handleChange}
            />
          </div>{" "}
          {/* form-group// */}
          <div className="form-group input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                {" "}
                <i className="fa fa-lock"></i>{" "}
              </span>
            </div>
            <input
              className="form-control"
              placeholder="Repeat password"
              type="password"
              name="pwd2"
              value={formData.pwd2}
              onChange={handleChange}
            />
          </div>{" "}
          {/* form-group// */}
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary btn-block"
              style={{ color: "black" }}
            >
              {" "}
              Create Account{" "}
            </button>
          </div>{" "}
          {/* form-group// */}
          <p className="text-center">
            Have an account? <a href="/login">Log In</a>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
