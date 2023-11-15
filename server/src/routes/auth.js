const { body } = require("express-validator");
const { login, signup } = require("../controllers/auth");
const User = require("../models/User");
const { Router } = require("express")
const router=Router()
router.post(
    "/signup",
    [
        body("email")
            .isEmail()
            .withMessage("Please enter a valid Email!")
            .custom(async (value) => {
                console.log(User)
                const user = await User.findOne({ email: value });
                if (user) {
                    return Promise.reject("Email address already exist!");
                }
            }),
        body("name").trim().notEmpty().withMessage("Name field must not be empty!"),
        body("password")
            .trim()
            .matches(
                "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
            )
            .withMessage(
                `Password must contain atleast 8 characters. There must be atleast one uppercase letter,one lowercase letter, one digit and one special character.`
            ),
    ],
    signup
);

router.post(
    "/login",
    body("email").isEmail().withMessage("Please enter a valid Email!"),
    login
);


module.exports = router