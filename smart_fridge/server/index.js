require("dotenv").config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import cron from "node-cron";

// Routes
import Auth from "./API/Auth";
import Items from "./API/Items";

// Database Connection
import ConnectDB from "./database/connection";
import { UserModel } from "./database/user/index";
import { FridgeModel } from "./database/fridge/index";
import details from "./API/mail";

const app = express();
const port = 4001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());

// Routes
app.use("/auth", Auth);
app.use("/", Items);

// Email Scheduler
cron.schedule('* * * * *', async () => {
    console.log("Scheduler running...");
    try {
        const users = await UserModel.find();
        if (users.length === 0) {
            console.log("No users in the user table");
            return;
        }

        for (const user of users) {
            const fridge = await FridgeModel.findOne({ user: user._id });
            if (fridge === null) {
                console.log("No user in the fridge table");
                continue;
            }

            for (const item of fridge.food) {
                const expDate = item.date;
                const curr = new Date();
                const newExp = new Date(expDate - 3 * 24 * 60 * 60 * 1000);

                if (curr >= newExp) {
                    console.log(`${item.name} expired`);

                    details.mDetails.to = user.email;
                    details.mDetails.text = `Your ${item.name} is about to expire on ${expDate}. To find recipes using ${item.name}, visit your EatIt account.`;

                    details.mTransporter.sendMail(details.mDetails, (err, data) => {
                        if (err) {
                            console.log('Error occurred:', err);
                        } else {
                            console.log('Email sent:', data.response);
                        }
                    });
                } else {
                    console.log(`${item.name} not expired`);
                }
            }
        }
    } catch (error) {
        console.log("Error occurred:", error);
    }
});

app.listen(port, async () => {
    await ConnectDB();
    console.log(`Server is up and running on port ${port}`);
});
