const mongoose = require("mongoose");
const mongoDbConnection = require('../../mongoDbConnection')
const config = require('../../config')


const dbConnection = mongoDbConnection(config.MONGODB_URI_SAMPLE)

const MovieSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    genres: {
        type: Array, 
        required: false
    },
    directors: {
        type: Array, 
        required: false
    }, 
    cast: {
        type: Array, 
        required: false
    },
    writers: {
        type: Array, 
        required: false
    },
    plot: {
        type: String, 
        required: false
    }, 
    countries: {
        type: Array, 
        required: false
    }, 
    year: {
        type: Number, 
        required: true
    }, 
    runtime: {
        type: Number, 
        required: true
    }
})

module.exports = dbConnection.model('Movies', MovieSchema)