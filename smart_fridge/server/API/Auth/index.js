//Library
import express from "express";

//Models
import { UserModel } from "../../database/user/index";

const Router = express.Router();

/*
Route           /signup
Description     Register new user
Params          none
Access          Public
Method          Post
*/

Router.post("/signup", async (req, res) => {
    try {
        await UserModel.findByEmailAndPhone(req.body.credentials);

        //Save to database
        const newUser = await UserModel.create(req.body.credentials).then(
            console.log("successfully passed data")
        );
        //generate JWT tokens - for session storage
        const token = newUser.generateJwtToken();

        return res.status(200).json({ token, status: "success" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/*
Route           /signin
Description     signing in user
Params          none
Access          Public
Method          Post
*/
Router.post("/signin", async (req, res) => {
    try {
        const user = await UserModel.findByEmailAndPassword(
            req.body.credentials
        );

        const token = user.generateJwtToken();
        return res.status(200).json({ token, status: "success" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
Router.post("/logout", async (req, res) => {
    try {
        
        await UserModel.findByIdAndUpdate(req.user._id, { isLoggedIn: false });

        return res.status(200).json({ status: "success" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
export default Router;
