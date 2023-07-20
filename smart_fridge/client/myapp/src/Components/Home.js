import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { GlobalContext } from "../GlobalState";
import "./Home.css";
import Image from "../images/new.svg";
import axios from "axios";

const Home = () => {
  const { setLoggedin, userDoc, setUserDoc } = useContext(GlobalContext);

  useEffect(() => {
    axios
      .post("http://localhost:4001/items/p", {
        email: localStorage.getItem("user"),
      })
      .then((resp) => {
        setUserDoc(resp.data.foods.food);
      });
  }, [userDoc.length]);
  setLoggedin(true);

  return (
    <div className="home_container">
      <div className="left">
        <img className="svg" src={Image} alt="" />
        <p className="left_info">
          Total Items in your Fridge:{" "}
          <span className="count">{userDoc.length}</span>
        </p>
      </div>
    </div>
  );
};

export default Home;
