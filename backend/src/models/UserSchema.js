
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, { expiresIn: "1h" });
};

const User = mongoose.model("User", userSchema);

const validateSignup = (data) => {
    const schema = joi.object({
        name: joi.string().required().label("Name"),
        email: joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password")
    });
    return schema.validate(data);
};

const validateLogin = (data) => {
    const schema = joi.object({
        email: joi.string().email().required().label("Email"),
        password: joi.string().min(6).required().label("Password")
    });
    return schema.validate(data);
};

module.exports = {
    User,
    validateSignup,
    validateLogin
};

