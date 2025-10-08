const { Admin } = require("../DB/db"); //we're directly taking or importing Admin from the DB/db.js so we Admin in curly braces
const jwt = require("jsonwebtoken");
const { JWT_ADMINSECRET } = require("../config");
// We will require the JWT_SECRET from the config.js 
// as we want to avoid the circular dependency as admin.js and adminMiddleware.js requiring each other and both carrying JWT_SECRETS 
// to avoid we use variable and store once in config.js

async function adminMiddleware(req,res,next){
    // const username = req.headers.username;
    // const password = req.headers.password;

    // try{
    //     const admin = await Admin.findOne({ //we will find in the Admin schema
    //         password,
    //         username
    //     })
    //     //it is like promisified await where find fxn works then pass the value as arg in fxn next will work if find then next else error

    //     if(admin){
    //         next();
    //     }
    //     else { //without writing else here it doesn't catches wrong credentials from headers despite of writing catch(err)
    //         res.status(403).json({
    //             message: "User does not exist or wrong credentials."
    //         });
    //     }
    // }
    // catch(err)
    // {
    //     res.status(403).json({
    //         message: "Internal server error."
    //     })
    // }
    
    // const token = req.headers.token;
    
    //*********************** STANDARD METHOD of taking token by bearer type authorization :- ******************************
    const authorization = req.headers.authorization;
    //authorization => bearer adasdfer.asfbngtvf.trgvbnmkf.rfdscsxa //Bearer makes it more standard
    const words = authorization.split(" "); 
    // => ["bearer", "adasdfer.asfbngtvf.trgvbnmkf.rfdscsxa"] through split(" ")
    const token = words[1]; //we will get the decoded by verification of token where words[1] = "adasdfer.asfbngtvf.trgvbnmkf.rfdscsxa"
    
    const decoded = jwt.verify(token, JWT_ADMINSECRET);
    //we need JWT_SECRET for specific collection to prform the verify coperation for that particular collection.
    // That's requiring it above

    if(decoded){ // jwt help to save the one db call for accessing the info or data of admin by direct checks of jwt into db
        req.adminId = decoded.id;
        next();
    }
    else
    {
        res.status(403).json({
            message: "You're not signed in."
        })
    }
}

module.exports = adminMiddleware