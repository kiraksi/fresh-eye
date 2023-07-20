import React from "react";
import "./Fridge.css";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import moment from "moment";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../GlobalState";

const FoodItem = ({ name, category, quantity, unit, date, _id }) => {
  const { setIsEditing } = useContext(GlobalContext);
  var date1 = new Date();
  var date2 = new Date(date);
  var time_difference = date2.getTime() - date1.getTime();
  var days_difference = (time_difference / (1000 * 60 * 60 * 24)).toFixed(0);
  const history = useNavigate();

  const deleteItem = (id) => {
    console.log(localStorage.getItem("user"));
    const emailId = localStorage.getItem("user");
    axios
      .delete(`http://localhost:4001/${id}/${emailId}`)
      .then((resp) => {
        console.log(resp);
        console.log("item deleted");
        history("/fridge");
      })
      .catch((err) => {
        console.log(err);
        // window.location = "/signup";
      });
  };

  const editItem = (id) => {
    setIsEditing(true);
    localStorage.setItem("id", id);
    localStorage.setItem("isedit", "true");
    history("/additem");
  };

  return (
    <div className="card">
      <div className="card_header">
        <h3 className="card_title">{name}</h3>
        <span className="card_icons">
          <button onClick={() => editItem(_id)} className="card_btn edit">
            <MdEdit />
          </button>
          <button onClick={() => deleteItem(_id)} className="card_btn delete">
            <MdDelete />
          </button>
        </span>
      </div>
      <div className="card_info-container">
        <p className="card_info">Category: {category}</p>
        <p className="card_info">
          Quantity: {quantity} {unit}
        </p>
        <p className="card_info">Expiry Date: {moment(date).format("L")}</p>
        <p
          className={`card_info expires 
        ${days_difference > 3 ? "green" : ""}
        ${days_difference < 4 ? "yellow" : ""}
        ${days_difference < 1 ? "red" : ""}`}
        >
          {days_difference >= 1
            ? `Expires in: ${days_difference}`
            : `Item expired`}{" "}
          {days_difference >= 1 ? (days_difference == 1 ? "day" : "days") : ""}
        </p>
      </div>
    </div>
  );
};

export default FoodItem;
