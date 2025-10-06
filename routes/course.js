const express = require("express");
const router = express.Router();

const userMiddleware = require("../Middlewares/userMiddleware");
const { Course, Purchase } = require("../DB/db");

// const router = express.Router();

router.use(express.json());

const jwt = require("jsonwebtoken");

router.post("/purchase", userMiddleware, async function(req,res){
    const userId = req.body.userId;
    const courseId = req.body.courseId;

    // A check should be added here for the actual payment of the course as to be purchase.
    // An one more file route is needed to hold the content of the course.

    await Purchase.create({
        userId,
        courseId
    })

    res.json({
        message: "You bought the Course successfully."
    })
})

// Here we find the all the courses on the platform
router.get("/preview", async function(req,res){

    const courses = await Course.find({ }); //this find without arg will cover everything that in the Purchase 
    res.json({
        courses: courses
    })
})

module.exports = router