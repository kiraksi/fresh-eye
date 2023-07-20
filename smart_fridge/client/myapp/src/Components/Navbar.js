import "./Navbar.css";
import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../GlobalState";
import { FiLogOut } from "react-icons/fi";


const Navbar = () => {
  const {
    loggedin,
    setLoggedin,
    current1,
    setCurrent1,
    current2,
    setCurrent2,
  } = useContext(GlobalContext);

  const isloggedin = localStorage.getItem("user");

  if (isloggedin) {
    setLoggedin(true);
  }

  const logout = () => {
    setLoggedin(false);
    localStorage.clear();
    window.location = "/";
  };

  return (
    <div className="navbar">
      <div className="logo">
        {/* <img src={require("../images/Logo.gif")} alt="logo" /> */}
        <h2>FreshEye</h2>
      </div>

      <div className="nav-links">
        {!loggedin && (
          <Link
            to="/"
            onClick={() => setCurrent1("login")}
            className={current1 === "login" ? "active" : ""}
          >
            Login
          </Link>
        )}
        {!loggedin && (
          <Link
            to="/signup"
            className={current1 === "signup" ? "active" : ""}
            onClick={() => setCurrent1("signup")}
          >
            Signup
          </Link>
        )}
        {loggedin && (
          <Link
            to="/home"
            className={current2 === "home" ? "active" : ""}
            onClick={() => setCurrent2("home")}
          >
            Home
          </Link>
        )}
        {loggedin && (
          <Link
            to="/fridge"
            className={current2 === "fridge" ? "active" : ""}
            onClick={() => setCurrent2("fridge")}
          >
            Fridge
          </Link>
        )}
        {loggedin && (
          <Link
            to="/recipes"
            className={current2 === "recipes" ? "active" : ""}
            onClick={() => setCurrent2("recipes")}
          >
            Recipe
          </Link>
        )}
        {loggedin && (
          <button onClick={logout} className="logout_btn">
            <FiLogOut className="logout_icon" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
