import React from 'react';
// import {Text, View} from 'react-native';
import Grocery from './grocery.js';

const GroceryList = ({groceries}) => {
    console.log(groceries);
    const getGroceryListJSX = (groceries) => {
        return groceries?.map((grocery) => {
            return (
            <Grocery 
            name={grocery.name}
            next_expiration_date={grocery.next_expiration_date}
            quantity_left={grocery.quantity_left}
            />
            );
        });
    };

    return <ul className="grocery_list">{getGroceryListJSX(groceries)}</ul>;
};

export default GroceryList
