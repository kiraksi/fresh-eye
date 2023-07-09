import React from 'react';
// import {Text, View} from 'react-native';
import GroceryList from './grocery_list.js';
import './App.css'


const App = () => {
    const tempList = [
        {
            name: 'banana',
            next_expiration_date: 7,
            quantity_left: 2
        },
        {
            name: 'apple',
            next_expiration_date: 2,
            quantity_left: 1
        }
    ];

    return (
        <div className='app'>
            <div className='groceries'>
                <h1>Available Groceries</h1>
                <GroceryList groceries={tempList}/>
            </div>
        </div>
    )
};

export default App;