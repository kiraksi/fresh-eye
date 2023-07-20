// const { response } = require('express');
import express from "express";
import { FridgeModel } from "../../database/fridge/index";
import mongoose from "mongoose";
import { UserModel } from "../../database/user/index";

const Router = express.Router();

//add new items post request
Router.post("/items", async (req, res) => {
  try {
    // console.log(req.body)
    const em = req.body.email;
    UserModel.findOne({ email: em }, async (err, users) => {
      // console.log(users)
      if (err) {
        console.log("No User in user table");
      } else {
        const User = await FridgeModel.findOne({
          user: mongoose.Types.ObjectId(users._id),
        });
        // console.log(User)
        if (User) {
          // User.user = mongoose.Types.ObjectId(users._id);
          User.food.push({
            name: req.body.credentials.name,
            category: req.body.credentials.category,
            date: req.body.credentials.date,
            quantity: req.body.credentials.quantity,
            unit: req.body.credentials.unit,
          });
          await User.save();
          // console.log(User)
        } else {
          const fridge = new FridgeModel();
          fridge.user = mongoose.Types.ObjectId(users._id);
          fridge.food = [];
          fridge.food.push({
            name: req.body.credentials.name,
            category: req.body.credentials.category,
            date: req.body.credentials.date,
            quantity: req.body.credentials.quantity,
            unit: req.body.credentials.unit,
          });
          await fridge.save();
          // console.log(fridge)
        }

        return res.status(200).json({ status: "success" });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});

Router.post("/items/p", async (req, res) => {
  try {
    const em = req.body.email;

    const user = await UserModel.findOne({ email: em });
    const id = mongoose.Types.ObjectId(user._id);

    const getFood = await FridgeModel.findOne({ user: id });

    if (getFood === null) {
      return res.status(404).json({ error: "User not found" });
    } else {
      return res.status(200).json({ foods: getFood });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//Put request to update the items (here email is required)
Router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    console.log(req.body.credentials);
    const em = req.body.email;
    const user = await UserModel.findOne({ email: em });
    const user_id = mongoose.Types.ObjectId(user._id);

    const currUser = await FridgeModel.findOne({ user: user_id });

    for (let item of currUser.food) {
      if (item._id.equals(id)) {
        console.log(item);
        item.name = req.body.credentials.name;
        (item.category = req.body.credentials.category),
          (item.date = req.body.credentials.date),
          (item.quantity = req.body.credentials.quantity),
          (item.unit = req.body.credentials.unit);
      }
    }
    await currUser.save();
    return res.status(200).json({ status: "success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// (here mail is required)
Router.delete("/:id/:emailId", async (req, res) => {
  try {
    const id = req.params.id;
    const em = req.params.emailId;
    const user = await UserModel.findOne({ email: em });
    const user_id = mongoose.Types.ObjectId(user._id);

    const currUser = await FridgeModel.findOne({ user: user_id });
    const newFood = currUser.food.filter((item) => {
      if (item._id.equals(id)) {
        console.log(item);
        return false;
      } else {
        return true;
      }
    });
    currUser.food = newFood;
    await currUser.save();
    return res.status(200).json({ status: "success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = Router;
