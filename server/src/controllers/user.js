const User = require("../models/User");
const Message = require("../models/Message");

const getUserProfile = async (req, res, next) => {
    let userId = req.userId ;
    try {
        const user = await User.findById(userId, { password: 0, __v: 0 });
        if (!user) throw user;
        res.status(200).json({ user });
    } catch (error) {
        const err = "Could Not find User!"
        next(err);
    }
};
const getUserProfileById = async (req, res, next) => {
    let userId = req.query.id ;
    try {
        const user = await User.findById(userId, { password: 0, __v: 0 });
        if (!user) throw user;
        res.status(200).json({ user });
    } catch (error) {
        const err = "Could Not find User!"
        next(err);
    }
};

const postMessage = async (req, res, next) => {
    let userId = req.userId ;
    let user;
    try {
        user = await User.findById(userId, { password: 0, __v: 0 });
        if (!user) throw user;
    } catch (error) {
        const err = "Could Not find User!"
        next(err);
    }
    const subject = req.body.subject;
    const message = req.body.message;
    try {
        const newMessage = await Message.create({
            message,
            subject,
            user: userId,
        });
        res.status(200).json({ message: newMessage });
    } catch (error) {
        res.status(400).json({ message: "Message could not be delivered" });
    }
};
module.exports = { getUserProfile, getUserProfileById, postMessage };