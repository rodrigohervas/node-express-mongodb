const logger = require('./logger')

//Security Access Handler middleware
function handleAuthorization(req, res, next) {
    const apiKey = req.get('authorization')

    //avoid apiKey on home ('/') or about ('/about') paths
    if(req.path === '/' || req.path === '/about') {
        next()
    }
    else if (!apiKey || apiKey.split(' ')[1] !== process.env.API_KEY) { //mandatory apiKey for the rest of the paths
        logger.error(`Unauthorized request to path: ${req.path}`)
        next({ status: '401', message: 'Unauthorized request' })
    }

    next()
}

module.exports = handleAuthorization