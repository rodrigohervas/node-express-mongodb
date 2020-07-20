const mongoose = require("mongoose");

const mongoDbConnection = (connectionString) => {
    const dbConnection = mongoose.createConnection(
        connectionString,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )

    dbConnection.on('connected', () => {
        console.log('Connected to DB')
    })

    dbConnection.on('disconnecting', () => {
        console.log('Disconnecting from DB')
    })
    
    dbConnection.on('disconnected', () => {
        console.log('Disconnected from DB')
    })
    
    dbConnection.on('error', error => {
        logger.error(error)
        console.log('DB Connection Error: ', error.message)
    })

    return dbConnection
}

module.exports = mongoDbConnection