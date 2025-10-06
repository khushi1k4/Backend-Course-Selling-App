const express = require("express");
const router = express.Router();

const userMiddleware = require("../Middlewares/userMiddleware");
const { User, Course, Purchase } = require("../DB/db");

// const router = express.Router();

const jwt = require("jsonwebtoken");
// const JWT_USERSECRET = 'khushiuserside'; 
// => Reason:
// Why are we using different JWT_SECRET in different routes or collections?
//we'll use different secret keys for the user and the admin 
// bcz in case if the objectId for user and admin will be same then it will cause vulnerability 
// to avoid this vulnerability we use different JWT_SECRETS for different collections

const { JWT_USERSECRET } = require("../config");
// Repeating a variable at two different places or files is a bad practice 
// so to avoid that we keep it once in config.js otherwise it causes circular dependency.

// Zod Validation to do
const bcrypt = require("bcrypt");

// - user wants to sign up on the app
router.post("/signup", async function(req,res){
    // const username = req.body.username;
    // const password = req.body.password;
    // const email = req.body.email;
    const { username, password, email } = req.body; //instead of writing like in above we can do it like this

    const hashedPassword = await bcrypt.hash(password,5); //here 5 rounds of bcryption of password is done
    console.log(hashedPassword);

    try{
        await User.create({ //await to give time to db to fetch and store it
            username,
            password: hashedPassword,
            // password, //now we'll use hashed password using bcrypt
            email
        })

        res.json({
            message: "User is successfully logged in."
        })
    }
    catch(err){
        res.status(403).json({
            error: res.err
        })
    }
})

// - user is signed in on the app. Without bcrypt the password
// router.post("/signin", userMiddleware, async function(req,res){
//     const {email, password} = req.headers; //we can use the password auth for sign in auth until the password is not hashed but after hash we can't use it

//     try{
//         const user = await User.findOne({ //await to give time to db to fetch and store it
//             email,
//             password
//         })

//         // we want to hash the password using bcrypt

//         if(user){
//             const token = jwt.sign({
//                 id: user._id 
//             }, JWT_USERSECRET);

//             // If want to do cookie authentication do it here 
//             res.json({
//                 token: token,
//                 message: "User is signed in."
//             })
//         }
//         else
//         {
//             res.json({
//                 message: "Incorrect credentials or user doesnot exist"
//             })
//         }
//     }
//     catch(err){
//         res.status(403).json({
//             error: res.err
//         })
//     } 
// })


// - user is signed in on the app. With bcrypt the password
router.post("/signin", async function(req,res){
    const {email, password} = req.headers; //we can use the password auth for sign in auth until the password is not hashed but after hash we can't use it

    try{
        const user = await User.findOne({ //await to give time to db to fetch and store it
            email
        })

        // we want to hash the password using bcrypt

        if(!user){
            res.json({
                message: "Incorrect credentials or user doesnot exist"
            })
            return
        }

        const Matchedpassword = bcrypt.compare(password, user.password);

            // If want to do cookie authentication do it here 
        if(Matchedpassword)
        {
            const token = jwt.sign({
                id: user._id.toString() // This id is used in userMiddleware as in decoded.id which store as in req.userId
            }, JWT_USERSECRET);

            res.json({
                token: token,
                message: "User is signed in."
            })
        }
    }
    catch(err){
        res.status(403).json({
            error: res.err
        })
    } 
})

// - user wants to see the purchased courses or user 
router.get("/purchases", userMiddleware, async function(req,res){
    const userId = req.userId;
    const purchases = await Purchase.find({
        userId
    })

    const courseData = await Course.find({
        id: {$in: purchases.map(x => x.courseId )}
    })
    res.json({
        purchases,
        courseData
    })
})

module.exports = router;