const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    }, 
    telephone: {
        type: String, 
        required: false
    },
    email: {
        type: String, 
        required: true
    }, 
    position: {
        type: String, 
        required: true
    }, 
    company: {
        type: String, 
        required: false
    }
});

module.exports = mongoose.model("Users", UserSchema);