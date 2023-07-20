//contains schema of the user
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
    {
        fullname: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String }
        // address: [{ details: { type: String }, for: { type: String } }],
        // phoneNumber: [{ type: Number }],
    },
    {
        timestamps: true,
    }
);

//Statics and Methods

UserSchema.methods.generateJwtToken = function () {
    return jwt.sign({ user: this._id.toString() }, "ZomatoAPP");
};

UserSchema.statics.findByEmailAndPassword = async ({ email, password }) => {
    //check wether email exists
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("User does nor exist!!!");

    // compare password
    const doesPasswordMatch = await bcrypt.compare(password, user.password);

    if (!doesPasswordMatch) throw new Error("invalid password!!!");

    return user;
};

UserSchema.statics.findByEmailAndPhone = async ({ email }) => {
    //check wether email exists
    const checkUserByEmail = await UserModel.findOne({ email });
    //const checkUserByPhone = await UserModel.findOne({ phoneNumber });

    if (checkUserByEmail) {
        throw new Error("User Alredy Exists...!");
    }

    return false;
};

UserSchema.pre("save", function (next) {
    const user = this;

    //password is modified
    if (!user.isModified("password")) return next();

    //password bcrypt salt
    bcrypt.genSalt(8, (error, salt) => {
        if (error) return next(error);

        //hash the password
        bcrypt.hash(user.password, salt, (error, hash) => {
            if (error) return next(error);

            //assigning hashed password
            user.password = hash;
            return next();
        });
    });
});

export const UserModel = mongoose.model("Users", UserSchema);
// module.exports = new mongoose.model("Users", UserSchema)