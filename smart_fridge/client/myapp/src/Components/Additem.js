import React, { useEffect } from "react";
import { BiCategory } from "react-icons/bi";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { MdProductionQuantityLimits } from "react-icons/md";
import axios from "axios";
import "./Additem.css";
import { useContext } from "react";
import { GlobalContext } from "../GlobalState";
import { useNavigate } from "react-router-dom";

const Additem = () => {
  const { item, setItem, isEditing, setIsEditing, userDoc } =
    useContext(GlobalContext);
  const history = useNavigate();
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setItem({ ...item, [name]: value });
    console.log(item);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4001/items", {
        credentials: item,
        email: localStorage.getItem("user"),
      })
      .then((resp) => {
        console.log(resp);
        console.log("user data passed");
      });
    history("/fridge");

    setItem({
      name: "",
      category: "",
      date: "",
      quantity: "",
      unit: "",
      email: "",
    });
    // window.location = "/fridge";
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const id = localStorage.getItem("id");
    console.log(id);
    const emailId = localStorage.getItem("user");

    console.log(emailId);
    axios
      .put(`http://localhost:4001/${id}`, { credentials: item, email: emailId })
      .then((resp) => {
        // console.log(resp);
        // console.log("item deleted");
        setIsEditing(false);
        localStorage.removeItem("id");
        localStorage.removeItem("isedit");
        localStorage.setItem("isedit", "false");
        history("/fridge");
      })
      .catch((err) => {
        console.log(err);
        // window.location = "/signup";
      });
  };
  
  const isedit = localStorage.getItem("isedit");
  // console.log(isedit);
  // console.log(isEditing);
  return (
    <div className="aiform__container" style={{ marginBottom: "30px" }}>
      <h1 className="sgform__title">
        {isedit === "true" ? "Edit" : "Add"} Food Item
      </h1>
      <form>
        <div className="sgform__input">
          <FaUserAlt className="sgicon" />
          <input
            type="text"
            name="name"
            value={item.name}
            onChange={handleChange}
            placeholder="Enter item name.."
            required
          />
        </div>

        <div className="sgform__input">
          <BiCategory className="sgicon" />
          <select name="category" onChange={handleChange}>
            <option value="#">Select Category</option>
            <option value="Vegetable">Vegetable</option>
            <option value="Fruit">Fruit</option>
            <option value="Dairy">Dairy</option>
            <option value="Fish">Fish</option>
            <option value="Meat">Meat</option>
            <option value="Pork">Pork</option>
          </select>
        </div>

        <div className="sgform__input">
          <BsFillCalendarDateFill className="sgicon" />
          <input
            type="date"
            name="date"
            value={item.password}
            onChange={handleChange}
            required
            placeholder="Enter the password..."
          />
        </div>
        <div className="sgform__input">
          <MdProductionQuantityLimits className="sgicon" />
          <input
            type="number"
            name="quantity"
            value={item.password}
            onChange={handleChange}
            required
            placeholder="Enter the quantity..."
          />
        </div>
        <div className="sgform__input">
          <BiCategory className="sgicon" />
          <select name="unit" onChange={handleChange}>
            <option value="#">Select Unit</option>
            <option value="mg">mg</option>
            <option value="kg">Kg</option>
            <option value="ml">ml</option>
            <option value="l">l</option>
            <option value="dozen">dozen</option>
            <option value="count">count</option>
          </select>
        </div>
        {isedit === "true" ? (
          <button className="sgbtn" type="button" onClick={handleEdit}>
            Edit
          </button>
        ) : (
          <button className="sgbtn" type="button" onClick={handleSubmit}>
            Add
          </button>
        )}
      </form>
    </div>
  );
};

export default Additem;
