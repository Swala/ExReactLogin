import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import Login from "./components/Login";
import Register from "./components/Register";
import ProjectBoard from "./components/ProjectBoard";
//import Profile from "./components/Profile";
//import BoardUser from "./components/BoardUser";
//import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
//import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";
import BoardUser from "./components/BoardUser";

const App = () => {
  //const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  const logOut = () => {
    AuthService.logout().then((r) => {
      setShowAdminBoard(false);
      setCurrentUser(undefined);
    });

    //setShowModeratorBoard(false);
  };

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      console.log(user.roles.includes("ROLE_ADMIN")); //ok
      setCurrentUser(user);
      //setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
    EventBus.on("logout", () => {
      logOut();
    });
    return () => {
      EventBus.remove("logout");
    };
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark p-3">
        <span className="navbar-brand mb-0 h1">Exam</span>
        <div className="navbar-nav mr-auto">
          {/*<li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>
           {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                Moderator Board
              </Link>
            </li>
          )}*/}
          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                New User
              </Link>
            </li>
          )}
          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/create-project"} className="nav-link">
                New Project
              </Link>
            </li>
          )}
          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>
        {currentUser ? (
          <div className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                <span className="bi bi-box-arrow-right fa-lg"></span>
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route exact path={"/"} element={<Login />} />
          <Route exact path={"/home"} element={<ProjectBoard />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/projectboard" element={<ProjectBoard />} />
          <Route path="/admin" element={<BoardAdmin />} />
          <Route path="/user" element={<BoardUser />} />
        </Routes>
      </div>
      {/*<AuthVerify logOut={logOut} />*/}
    </div>
  );
};
export default App;

//<Route path="/user" element={<BoardUser />} />
//<Route path="/mod" element={<BoardModerator />} />
