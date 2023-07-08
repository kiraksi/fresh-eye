import React from 'react';
// import {Text, View} from 'react-native';
import './grocery.css'

const Grocery = (props) => {
    
    return (
        <li className="grocery_item">
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

export default Grocery;