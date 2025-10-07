const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
mongoose.connect(process.env.MONGO_URL);

const AdminSchema = new mongoose.Schema({
    username : String,
    password: String
})

const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    username: String,
    purchsedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
})

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