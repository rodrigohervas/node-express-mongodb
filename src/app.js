const express = require("express")
require("dotenv").config()
const morgan = require('morgan')
const bodyParser = require("body-parser")
const cors = require("cors")
const usersRouter = require("./api/users/users.router")
const moviesRouter = require("./api/movies/movies.router")
const handleAuthorization = require('./authorization-handler') 
const errorHandler = require('./error-handler')


const app = express()

//MIDDLEWARE
//Use of Morgan coloring for console middleware
const morganSetting = process.env.NODE_ENV = 'production' ? 'tiny' : 'dev'
app.use(morgan(morganSetting))

//cors middleware
app.use(cors());

//Body parsing middleware
app.use(bodyParser.json());

//Authorization middleware
app.use(handleAuthorization)


//ROUTES SECTION

// -> Home routing middleware
app.get("/", (req, res) => {
    res.json("Welcome to the app.");
});

// -> About routing middleware
app
    .route("/about")
    .get((req, res) => {
        res.json('About us');
    });

// -> Users routing middleware
app.use("/api/users", usersRouter)

// -> Movies routing middleware
app.use("/api/movies", moviesRouter)


//error handling middleware
app.use(errorHandler)

module.exports = app;