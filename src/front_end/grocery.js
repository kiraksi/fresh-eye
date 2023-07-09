import React from 'react';
// import {Text, View} from 'react-native';
import './grocery.css'
import PropTypes from 'prop-types';

const Grocery = (props) => {
    
    let ripeClass = ""
    if (props.ripeness === "rotten") {
        ripeClass = "rotten_class"
    } else if (props.ripeness === "unripe") {
        ripeClass = "unripe_class"
    } else if (props.ripeness === "overripe") {
        ripeClass = "overripe_class"
    } else {
        ripeClass = "ripe_class"
    };

    return (
        <li className={ripeClass}>
            <div className="grocery_name">
                <h3>{props.name}</h3>
            </div>
            <div className="extra_info">
                <li className="extra_info_list">
                    <h4>Expires in: {props.next_expiration_date} days</h4>
                    <h4>Quantity: {props.quantity_left}</h4>
                </li>
            </div>
        </li>
    )
}

Grocery.propTypes = {
    name: PropTypes.string.isRequired,
    next_expiration_date: PropTypes.number.isRequired,
    quantity_left: PropTypes.number.isRequired,
    ripeness: PropTypes.string.isRequired,
};

export default Grocery;