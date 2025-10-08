const express = require("express");
const router = express.Router();

const userMiddleware = require("../Middlewares/userMiddleware");
const { User } = require("../DB/db");

// const router = express.Router();

const jwt = require("jsonwebtoken");
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

        await User.create({ //await to give time to db to fetch and store it
            username,
            password: hashedPassword,
            // password, //now we'll use hashed password using bcrypt
            email,
            purchasedCourses: []
        })

        res.json({
            message: "User is successfully logged in."
        })

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

// Courses that are being purchased are added in array of purchasedCourse of User schema
router.post("/courses/:courseId", userMiddleware, async function(req,res){
    // Extract course ID from request parameters and username from the request object
    const courseId = req.params.courseId;
    // const username = req.username;
    const userId = req.userId;

    // const user = await User.findById({ userId });
    
    try {
        // Update the user document to add the purchased course ID to the user's purchasedCourses array
        await User.findByIdAndUpdate(
                userId,
            {
                $push: {
                    purchasedCourses: courseId, // Add course ID to purchasedCourses
                },
            }
        );

        // const courseData = await Course.findById(
        //     userId,
        //     {
        //         $in: {  courseData: user.map(x => x.courseId )}
        //     }
        // )

        // Respond with a success message and a 200 OK status
        res.status(200).json({
            message: "Course purchased successfully", // Confirm course purchase
        });
    } catch (err) {
        // If the update fails, respond with a 400 Bad Request error
        return res.status(400).json({
            message: "Course purchase failed", // Inform the client of purchase failure
            error: err.message, // Include error message for debugging
        });
    }

})

// - user wants to see his/her total purchased courses 
// router.get("/purchases", userMiddleware, async function(req,res){
//     // Extract username from the request object
//     const username = req.username;
//     const userId = req.userId;

//     try {
//         // Find the user document by username
//         const user = await User.findById({ userId });

//         // If user is not found, respond with a 404 Not Found error
//         if (!user) {
//             return res.status(404).json({
//                 message: "User not found", // Inform the client that the user does not exist
//             });
//         }

//         // Fetch courses that the user has purchased
//         const courses = await Course.findByIdAndUpdate(
//             userId,
//             {
//                 _id: { $in: user.purchasedCourses } // Find courses whose IDs are in the user's purchasedCourses array
//             }
//         );
//         const courseData = await Course.findById(
//             userId,
//             {
//                 id: {  $in: user.map(x => x.courseId )}
//             }
//         )

//         // Respond with the list of purchased courses and a 200 OK status code
//         res.status(200).json({
//             courses, // Return the array of purchased courses
//         });
//     } catch (error) {
//         // If an error occurs while fetching courses, respond with a detailed error message
//         return res.status(500).json({
//             message: "Failed to retrieve purchased courses. Please try again.", // Inform the client of the specific error
//             error: error.message, // Include the error message for debugging purposes
//         });
//     }
// })

module.exports = router;