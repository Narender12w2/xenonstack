const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const signup = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw errors.array().reduce((f, r) => f + r.msg + " ", "");
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            email,
            password: hashedPassword,
            name,
        });
        const result = await user.save();
        const token = jwt.sign(
            { email, userId: result._id.toString() },
            process.env.JSONSECRET,
            { expiresIn: "1h" }
        );
        res.status(201).json(token);
    } catch (error) {
        const err = "Validation Error";
        if (typeof error === "string") err = error;
        else if (error instanceof Error) err = error.message;

        next(err);
    }
};
const login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const errors = validationResult(req).array();
        if (errors.length > 0) throw errors[0].msg;
        const user = await User.findOne({ email });
        if (!user)
            next("A user with this email could not be found.");
        else {
            const isEqual = await bcrypt.compare(password, user.password);
            if (!isEqual) next("Incorrect Password.");
            else {
                const token = jwt.sign(
                    { email, userId: user._id.toString() },
                    process.env.JSONSECRET,
                    { expiresIn: "1h" }
                );
                res.status(200).json(token);
            }
        }
    } catch (error) {
        const err = "Could Not Login. Please try again!";
        if (typeof error === "string") err = error;
        else if (error instanceof Error) err = error.message;
        next(err);
    }
};
module.exports = { login, signup };
