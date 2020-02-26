const express = require("express")
const morgan = require('morgan')
require("dotenv").config()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const usersRouter = require("./api/users/users.router")

const app = express()

//MIDDLEWARE
//Use of Morgan coloring for console middleware
const morganSetting = process.env.NODE_ENV = 'production' ? 'tiny' : 'dev'
app.use(morgan(morganSetting))

//cors middleware
app.use(cors());

//Body parsing middleware
app.use(bodyParser.json());

//DB Connection and error handling middleware
mongoose.connect(
    process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connection to DB established.")
    })
    .catch(error => {
        connectionErrorHandler(error)
    })

mongoose.connection.on('error', error => connectionErrorHandler(error))

function connectionErrorHandler(error) {
    console.log('Error: ', error.message)
}

//Security Access Handler middleware
function handleAccessSecurity(req, res, next) {
    const apiKey = req.get('authorization')

    //avoid apiKey on home ('/') and about ('/about') paths
    if(req.path === '/' || req.path === '/about') {
        next()
    }
    else if (!apiKey || apiKey.split(' ')[1] !== process.env.API_KEY) { //mandatory apiKey for the rest of the paths
        next({ status: '401', message: 'Unauthorized request' })
    }

    next()
}
app.use(handleAccessSecurity)

//ROUTES SECTION

// -> Home
app.get("/", (req, res) => {
    res.json("Welcome to the app.");
});

// -> About
app
    .route("/about")
    .get((req, res) => {
        res.json('About us');
    });

// -> Users
//Users routing middleware
app.use("/users", usersRouter);

//Error Handling middleware
function errorHandler(error, req, res, next) {
    let response
    if (process.env.NODE_ENV === 'production') {
        response = {
            error: { message: "server error", status: 500 }
        }
    }
    else {
        response = {
            error: { message: error.message, status: error.status ? error.status: 500 }
        }
    }

    res.status(response.error.status).json(response);
}
app.use(errorHandler)


//export for server.js to import the app and start the server listening to port
module.exports = app;