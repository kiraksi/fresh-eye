/*
Name
category
date
quantity
unit
*/
//Schema for orders
import mongoose from "mongoose";

const FridgeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: "Users",
        },
        food: [
            {
                name: { type: String, required: true },
                category: { type: String, required: true },
                date: { type: Date, required: true },
                quantity: { type: Number, required: true },
                unit: { type: String, required: true },
            },
        ],
    },
    {
        timestamps: true,
    }
);

export const FridgeModel = mongoose.model("Fridges", FridgeSchema); 
// const FridgeModel = new mongoose.model('Fridges', FridgeSchema)
// module.exports = FridgeModel
/*
timestamps adds date and time when user account was created and updated at
created at
updated at
*/
