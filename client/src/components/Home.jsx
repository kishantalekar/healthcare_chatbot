import React, { useState } from "react";
import { Button } from "@chakra-ui/react"; // Example import from Chakra-UI
// import "./App.css"; // Your custom styles
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../styles/home.css";
// import "../App.css";
import robot from "../images/robot.png";
const App = ({ isAuth, setAuthFun }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("email")
  );
  const handleLogout = () => {
    localStorage.setItem("email", "");
    console.log(logout);
    setIsAuthenticated(false);
    setAuthFun(false);
  };

  return (
    <div className="App">
      <Navbar
        isAuth={isAuth}
        handleLogout={handleLogout}
        isAuthenticated={isAuthenticated}
      />
      <Header isAuthenticated={isAuthenticated} />
    </div>
  );
};

const Navbar = ({ isAuth, handleLogout, isAuthenticated }) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <a className="navbar-brand" href="/">
      <img
        src={robot}
        alt="Chatbot"
        width="30"
        height="30"
        className="d-inline-block align-top"
      />
      Chatbot
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div
      // className="collapse navbar-collapse"
      style={{ marginLeft: "auto" }}
      id="navbarNav"
      // style={{ color: "white" }}
    >
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a className="nav-link" href="/" style={{ color: "white" }}>
            Home
          </a>
        </li>
        {isAuth && (
          <li className="nav-item">
            <a className="nav-link" href="/" style={{ color: "white" }}>
              <button onClick={handleLogout}> Logout</button>
            </a>
          </li>
        )}

        <li className="nav-item">
          <a className="nav-link" href="/" style={{ color: "white" }}>
            Contact
          </a>
        </li>
      </ul>
    </div>
  </nav>
);

const Header = ({ isAuthenticated }) => (
  <header className="header">
    <div
      className="container text-center"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <h1 className="display-4">Healthcare Chatbot</h1>
      <p className="lead">
        The only way to solve this problem is through technology. We can't
        produce a million doctors overnight, but if we succeed in creating a
        cloud program which diagnoses people's problems we can give a
        hospital-like service to all the people who have access to PC/Smartphone
        with internet.
      </p>
      <div className="button-group">
        {!isAuthenticated ? (
          <>
            <a href="/register" className="btn btn-primary mr-2">
              Register
            </a>
            <a href="/login" className="btn btn-secondary">
              Login
            </a>
          </>
        ) : (
          <a href="/chat" className="btn btn-secondary">
            chat
          </a>
        )}
      </div>
    </div>
  </header>
);
export default App;
