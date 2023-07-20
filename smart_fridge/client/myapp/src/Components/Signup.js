import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import "./Signup.css";
import axios from "axios";
import { useContext } from "react";
import { GlobalContext } from "../GlobalState";

const Signup = () => {
    const { usersignup, setUsersignup, setCurrent1 } = useContext(GlobalContext);
    setCurrent1("signup");
    
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUsersignup({ ...usersignup, [name]: value });
        console.log(usersignup);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("user",usersignup.email);
        axios
            .post("http://localhost:4001/auth/signup", { credentials: usersignup , email: localStorage.getItem("user")})
            .then((resp) => {
                console.log(resp.data);
                console.log("user data passed");
                localStorage.setItem("isedit","false");
                window.location = "/home";
            })
            .catch((err) => {
                console.log(err);
                window.location = "/signup";
            });
        setUsersignup({ email: "", password: "", fullname: "" });
        //window.location = "/home";
    };

    return (
        <div className="sgform__container" style={{ marginBottom: "30px" }}>
            <h1 className="sgform__title">Signup</h1>
            <form>
                <div className="sgform__input">
                    <FaUserAlt className="sgicon" />
                    <input
                        type="text"
                        name="fullname"
                        value={usersignup.fullname}
                        onChange={handleChange}
                        placeholder="Enter the username..."
                        required
                    />
                </div>

                <div className="sgform__input">
                    <MdEmail className="sgicon" />
                    <input
                        type="email"
                        name="email"
                        value={usersignup.email}
                        onChange={handleChange}
                        placeholder="Enter the email..."
                        required
                    />
                </div>

                <div className="sgform__input">
                    <RiLockPasswordFill className="sgicon" />
                    <input
                        type="password"
                        name="password"
                        value={usersignup.password}
                        onChange={handleChange}
                        required
                        placeholder="Enter the password..."
                    />
                </div>
                {/* <input type="submit" className="sgbtn" value="submit"></input> */}
                <button className="sgbtn" type="button" onClick={handleSubmit}>
                    Signup
                </button>
            </form>
        </div>
    );
};

export default Signup;
