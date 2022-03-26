import React from "react";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import "./css/style.css";
import Error from "./routes/Error";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Profile from "./routes/Profile";
import Register from "./routes/Register";

toast.configure();
function App() {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const clickHandler = () => {
    setShowModal(!showModal);
  };
  console.log(showModal);
  return (
    <>
      <Navbar />
      <main className="main">
        <div className="container">
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/"
              element={
                <Home showModal={showModal} setShowModal={setShowModal} />
              }
            />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
        {location.pathname === "/" && (
          <span className="create-task-btn" onClick={clickHandler}>
            <i className="fas fa-plus"></i>
          </span>
        )}
      </main>
    </>
  );
}

export default App;
