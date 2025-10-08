require("dotenv").config()

const express = require("express");
const mongoose = require("mongoose");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const courseRouter = require('./routes/course');
const bodyParser = require("body-parser");

// Zod validation is left. (~tried)
// Use cookies instead of jwt for auth
// delete the db for different models can be added
// course content routes and things related can be to do
const app = express();

app.use(express.json()); //It is must needed to get the req.body from the db or postman

app.use(bodyParser.json());
app.use("/admin",adminRouter);
app.use("/user",userRouter);
app.use('/course',courseRouter);

const Port = 3000;
app.listen(Port, ()=>{
    console.log(`Server started on port ${Port}!`);
});