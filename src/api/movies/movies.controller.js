const Movie = require("./movies.model")
const logger = require('../../logger')



const MoviesController = {

    //getMovies
    getMovies(req, res, next) {
        const limit = req.query.limit != undefined ? parseInt(req.query.limit) : 10
        try {
            Movie
            .find()
            //.where('year').gte(1998).lte(2019)
            .limit(limit)
            .then( movies => {
                console.log('MOVIES: ', movies.length)
                res.status(200).json(movies)
            })
            .catch(error => {
                console.log("ERROR: ", error)
                next({ message: 'error after getting movies' })
            })
        } 
        catch (error) {
            logger.error(`${error.message} at movies.controller.getMovies`)
            next({ message: 'error getting movies' })
        }
    }, 

    //getMovie
    getMovie(req, res, next) {
        try {
            const id = req.params.id;
            Movie
            .findById(id, 'title genres directors cast writers plot countries year runtime')
            .then( movie => {
                res.status(200).json(movie)
            })
            .catch(error => {
                logger.error(`${error.message} at movies.controller.getMovie`)
                next({ message: 'error after getting movie' })
            })
        } 
        catch (error) {
            logger.error(`${error.message} at movies.controller.getMovie`)
            next({ message: 'error getting movie' })
        }
    },

    //createMovie
    createMovie(req, res, next) {
        try {
            /**
             * title, genres, directors, cast, writers, plot, countries, year, runtime
             */
            const {title, genres, directors, cast, writers, plot, countries, year, runtime} = req.body
            const movie = {
                title: title, 
                genres: genres, 
                directors: directors, 
                cast: cast, 
                writers: writers, 
                plot: plot, 
                countries: countries, 
                year: year, 
                runtime: runtime
            }

            //const movie = new Movie()
            // movie.title = title
            // movie.genres = genres
            // movie.directors = directors 
            // movie.cast = cast
            // movie.writers = writers
            // movie.plot = plot
            // movie.countries = countries
            // movie.year = year
            // movie.runtime = runtime
            // movie.save()
            //     .then(result => {
            //         console.log('result: ', result)
            //         res.status(201).json('movie created')
            //     })
            //     .catch(error => console.log('ERROR: ', error))

            //TODO: VALIDATE CONSTS FROM REQ.BODY

            console.log('movie: ', movie)
            
            Movie.create(movie)
                .then(result => {
                    console.log('result: ', result)
                    res.status(201).json('Movie created')
                })            
                .catch(error => {
                    logger.error(`${error.message} at movies.controller.createMovie`)
                    console.log('ERROR: ', error)
                    next({ message: 'error after creating movie' })
                })
        } 
        catch (error) {
            logger.error(`${error.message} at movies.controller.createMovie`)
            next({ message: 'error creating movie' })
        }
    }

//updateMovie
//deleteMovie

}

module.exports = MoviesController