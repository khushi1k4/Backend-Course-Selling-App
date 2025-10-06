const express = require("express");
const router = express.Router();

const adminMiddleware = require("../Middlewares/adminMiddleware");
const { Admin, Course } = require("../DB/db");

// const router = express.Router();

router.use(express.json());

const jwt = require("jsonwebtoken");
// const JWT_ADMINSECRET = 'khushiadminside';
// => Reason:
// Why are we using different JWT_SECRET in different routes or collections?
//we'll use different secret keys for the user and the admin 
// bcz in case if the objectId for user and admin will be same then it will cause vulnerability 
// to avoid this vulnerability we use different JWT_SECRETS for different collections

const { JWT_ADMINSECRET } = require("../config");
// Repeating a variable at two different places or files is a bad practice 
// so to avoid that we keep it once in config.js otherwise it causes circular dependency.


const bcrypt = require("bcrypt");

// - admin wants to sign up on the app
router.post("/signup", async function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    await Admin.create({
        username: username,
        password: password
    })
    // .then(function(){  //if we don't use async await then we use .then method where fxn in arg
    //     res.json({
    //         message: "User logged up." 
    //     })
    // })

    res.json({
        message: "Admin signed up." 
    })

})

// - admin is signed in on the app.
router.post("/signin", async function(req,res){
    const {username, password} = req.headers; //we can use the password auth for sign in auth until the password is not hashed but after hash we can't use it

    try{
        const admin = await Admin.findOne({ //await to give time to db to fetch and store it
            username,
            password
        })

        // we want to hash the password using bcrypt

        if(admin){
            const token = jwt.sign({
                id: admin._id  //This id is going to be in the adminMiddleware while calling the decoded.id and store as in req.adminId
            }, JWT_ADMINSECRET);

            // If want to do cookie authentication do it here 
            res.json({
                token: token,
                message: "Admin is signed in."
            })
        }
        else
        {
            res.json({
                message: "Incorrect credentials or user doesnot exist"
            })
        }
    }
    catch(err){
        res.status(403).json({
            error: res.err
        })
    } 
})

// - user wants to add new course in it
router.post("/course", adminMiddleware, async function(req,res){
    // const title = req.body.title;
    // const description = req.body.description;
    // const price = req.body.price;
    // const imageLink = req.body.imageLink;

    const adminId = req.adminId; //This req.adminId coming from the adminMiddleware which we passed in fxn handler
    const { title, description, price, imageLink } = req.body;

    // zod for input validations
    const newCource = await Course.create({
        title: title, //if the key and values are the same then just write key only
        description,
        price,
        imageLink,
        creatorId: adminId
    })

    console.log(newCource); //it will also console the _id and __v from mongodb along with title, desc, imageLink, price
    
    res.json({
        message: "Course created successfully", courseId: newCource._id //a _id is created in DB for the newCourse for that keep async await or .then to fetch it and give it a time
    })
})

// - If Admin wants to update the data od Course then we use put HTTP method 
router.put("/UpdateCourse", adminMiddleware, async function(req,res){
    const { title, description, price, imageLink, courseId } = req.body; //it is imp to give the courseId in body while req
    const adminId = req.adminId;

    const UpdatedCourse = await Course.updateOne({
        _id: courseId,
        creatorId: adminId //here we're checking if the courseId and creatorId is matched then only admin can update or edit as if the courseId is not belonging to the admin then it can't access it. otherwise creators will updates each other courses that affects the platform.
    },{ 
        title,
        description,
        price,
        imageLink
    })

    console.log(UpdatedCourse);

    res.json({
        message: "Course information is updated.", courseId: UpdatedCourse._id
    })

})

// - Admin wants to see or view all it's courses in the course selling app
router.get("/courses", adminMiddleware, async function(req,res){
    const adminId = req.adminId;
    const response = await Course.find({
        creatorId: adminId //Here we give argument to the find method which means that those courses which have this creatorid will give the courses of this creator
    }); //If we find without arg will cover everything in the Course but here we're passing due to admin particular but in case of user we want to show all courses so no arg passed

    res.json({
        courses: response
    })

})

module.exports = router;