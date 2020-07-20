const mongoose = require("mongoose");
const mongoDbConnection = require('../../mongoDbConnection')
const config = require('../../config')


const dbConnection = mongoDbConnection(config.MONGODB_URI_SAMPLES)

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

module.exports = dbConnection.model("Users", UserSchema);