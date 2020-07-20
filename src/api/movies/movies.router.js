const express = require("express")
const MoviesController = require("./movies.controller")

const moviesRouter = express.Router();

moviesRouter
    .route("/")
    .get(MoviesController.getMovies)
    .post(MoviesController.createMovie)
    

moviesRouter
    .route("/:id")
    .get(MoviesController.getMovie)
    //.delete(MoviesController.deleteMovie)
    //.patch(MoviesController.updateMovie)

module.exports = moviesRouter