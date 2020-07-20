module.exports = {
    PORT: process.env.PORT || 4000,
    NODE_ENV: process.env.NODE_ENV || 'development', 
    MONGODB_URI_USERS: process.env.MONGODB_URI_USERS, 
    MONGODB_URI_SAMPLE: process.env.MONGODB_URI_SAMPLE, 
    MONGODB_URI_SAMPLES: process.env.MONGODB_URI_SAMPLES, 
    API_KEY: process.env.API_KEY
}