import ChatWithGemini from "./components/ChatWithGemini";
import { Container } from "@chakra-ui/react";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
// import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute component

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("email"); // Check for user authentication
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const [isAuth, setAuth] = useState(!!localStorage.getItem("email"));

  function setAuthFun(value) {
    setAuth(value);
  }
  return (
    <Container
      maxW={"none"}
      className="App"
      bgColor={"black"}
      bgGradient={"linear(to-r, gray.800, blue.700)"}
      color={"black"}
    >
      <Routes>
        <Route
          path="/"
          element={<Home isAuth={isAuth} setAuthFun={setAuthFun} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <ChatWithGemini />
            </PrivateRoute>
          }
        />
      </Routes>
    </Container>
  );
}

export default App;
