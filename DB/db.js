const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
mongoose.connect(process.env.MONGO_URL); //changed connection string and make it hidden store 

const AdminSchema = new mongoose.Schema({
    username : String,
    password: String
})

const UserSchema = new mongoose.Schema({
    username: String, // Unique username for the user
    password: String, // User password (should be hashed)
    email: { type: String, unique: true },
    purchasedCourses: [ String ]
        // List of purchased course IDs
        // {
        //     type: mongoose.Schema.Types.ObjectId, // Reference to Course model
        //     ref: "Course",
        // },
    
});

const CourseSchema = new mongoose.Schema({
    title : String,
    description : String,
    imageLink: String,
    price: Number,
    creatorId: ObjectId
})

const PurchasedSchema = new mongoose.Schema({
    userId : ObjectId,
    courseId : ObjectId
})

const User = mongoose.model('User', UserSchema);
const Admin = mongoose.model('Admin', AdminSchema);
const Course = mongoose.model('Course', CourseSchema);
const Purchase = mongoose.model("Purchase", PurchasedSchema);

module.exports = {
    Course, Admin, User, Purchase
}