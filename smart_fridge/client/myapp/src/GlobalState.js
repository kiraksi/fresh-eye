import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [loggedin, setLoggedin] = useState(false);

  const [usersignup, setUsersignup] = useState({
    email: "",
    password: "",
    fullname: "",
  });

  const [userlogin, setUserlogin] = useState({ email: "", password: "" });

  const [item, setItem] = useState({
    name: "",
    category: "",
    date: "",
    quantity: "",
    unit: "",
    email: "",
  });

  const [current1, setCurrent1] = useState("login");
  const [current2, setCurrent2] = useState("home");
  const [userDoc, setUserDoc] = useState([]);
  const [isediting, setIsEditing] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        loggedin,
        setLoggedin,
        usersignup,
        setUsersignup,
        userlogin,
        setUserlogin,
        item,
        setItem,
        current1,
        setCurrent1,
        current2,
        setCurrent2,
        userDoc,
        setUserDoc,
        isediting,
        setIsEditing,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
