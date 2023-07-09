import React, {useState, useEffect} from 'react';
// import {Text, View} from 'react-native';
import GroceryList from './grocery_list.js';
import './App.css'
import axios from "axios";


const App = () => {
    const [groceries, setGroceries] = useState([]);
    const API = "http://127.0.0.1:5000/api/fruits";

    const getAllGroceries = () => {
        axios
            .get(`${API}`)
            .then((result) => {
                setGroceries(result.data)
            })
            .catch((err) => {
                console.log(err)
            });
        };
    
    useEffect(() => {
        getAllGroceries();
    }, []);
    
    return (
        <div className='app'>
            <div className='groceries'>
                <h1>Available Groceries</h1>
                <GroceryList groceries={groceries}/>
            </div>
        </div>
    )
};

export default App;