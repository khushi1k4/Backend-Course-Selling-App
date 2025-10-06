const { User } = require("../DB/db"); //we're directly taking or importing Admin from the DB/db.js so we Admin in curly braces
const jwt = require("jsonwebtoken");
const { JWT_USERSECRET } = require("../config");
// We will require the JWT_SECRET from the config.js 
// as we want to avoid the circular dependency as user.js and userMiddleware.js requiring each other and both carrying JWT_SECRETS 
// to avoid we use variable and store once in config.js

async function UserMiddleware(req,res,next){
    // const email = req.headers.email;
    // // const password = req.headers.password; 

    // const user = await User.findOne({ //we will find in the User schema
    //     email: email,
    //     // password: password //can't use it when password is hashed

    // })
    // if(user)
    // {
    //     next();
    // }
    // else
    // {
    //     res.status(403).json({
    //         message: "User doesnot exist."
    //     })
    // }

    const token = req.headers.token;
    const decoded = jwt.verify(token, JWT_USERSECRET); 
    //we need JWT_SECRET for specific collection to prform the verify coperation for that particular collection.
    // That's requiring it above

    if(decoded){
        req.userId = decoded.id;
        next();
    }
    else
    {
        res.status(403).json({
            message: "You're not signed in."
        })
    }
}

module.exports = UserMiddleware