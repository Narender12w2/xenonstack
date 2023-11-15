const express = require("express");
const dotenv =require( "dotenv");
const mongoose =require( "mongoose");
const { json } = require( "body-parser");
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
var cors = require('cors')

dotenv.config();

const app = express();


app.use(cors())

app.use(json());

app.use((_req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods',"GET,POST,PUT,PATCH,DELETE");
    res.setHeader('Access-Control-Allow-Headers',"Content-Type, Authorization");
    next();
})

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.use((err, _req, res, _next) => {
    res.status(400).json(err);
});

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.CLUSTER}`;
mongoose
    .connect(uri)
    .then((_result) =>
        app.listen(process.env.PORT, () => {
            console.log(uri)
            console.log(`Listning on port ${process.env.PORT}`);
        })
    )
    .catch((error) => {
        throw error;
    });