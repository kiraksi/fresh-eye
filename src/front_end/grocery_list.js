import React from 'react';
// import {Text, View} from 'react-native';
import Grocery from './grocery.js';
import PropTypes from 'prop-types';

const GroceryList = ({groceries}) => {
    console.log(groceries);
    const getGroceryListJSX = (groceries) => {
        return groceries?.map((grocery) => {
            return (
            <Grocery 
            name={grocery.name}
            next_expiration_date={grocery.expire_date}
            quantity_left={grocery.count}
            ripeness={grocery.ripeness}
            />
            );
        });
    };

    return <ul className="grocery_list">{getGroceryListJSX(groceries)}</ul>;
};

GroceryList.propTypes = {
    groceries: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            next_expiration_date: PropTypes.number.isRequired,
            quantity_left: PropTypes.number.isRequired,
            ripeness: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default GroceryList
