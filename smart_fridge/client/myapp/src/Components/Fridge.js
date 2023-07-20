import React, { useEffect } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import FoodItem from "./FoodItem";
import "./Fridge.css";
import { useContext } from "react";
import { GlobalContext } from "../GlobalState";
import axios from "axios";

const Fridge = () => {
  const { userDoc, setUserDoc, setCurrent2 } = useContext(GlobalContext);
  setCurrent2("fridge");
  axios
    .post("http://localhost:4001/items/p", {
      email: localStorage.getItem("user"),
    })
    .then((resp) => {
      setUserDoc(resp.data.foods.food);
    });

  useEffect(() => {
    console.log(userDoc);
  }, []);

  return (
    <>
      <Link to="/additem" className="add_link">
        <AiFillPlusCircle className="add_icon" />
      </Link>
      <h3 className="add_descp">Add Item</h3>
      <h1 className="title">Your Fridge</h1>
      <div className="card_container">
        {userDoc.map((item) => {
          return <FoodItem key={item.id} {...item} />;
        })}
      </div>
    </>
  );
};

export default Fridge;
