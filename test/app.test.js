const mocha =  require('mocha');
const { expect } = require('chai');
const supertest = require('supertest');
const mongoose = require("mongoose");
const app = require('../app');

//Manage the DB connection
before(() => {
    mongoose.connect(
        process.env.DB_CONNECTION, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true 
        }, 
        () => console.log("Connection to DB established.")
    )
    .catch(error => console.log('DB connection error: ', error));
});

after(() => {
    mongoose.disconnect();
})


describe('Express app', () => {

    it('Home route should return text', () => {
        return supertest(app)
            .get('/')
            .expect(200, '"Home page"');
    });

    it('/users/:id should return a user object', () => {
        const route = '/users/5e49ac8922c62d9c4c05988e';
        return supertest(app)
            .get(route)
            .expect(200)
            .then( res => {
                expect(res.body).to.be.an('object');
                expect(res.body).to.eql({
                    "_id": "5e49ac8922c62d9c4c05988e",
                    "name": "new name",
                    "email": "new email",
                    "position": "new position",
                    "telephone": "new phone",
                    "company": "new company",
                    "__v": 0
                });
                expect(res.body).to.deep.include({
                    "_id": "5e49ac8922c62d9c4c05988e",
                    "name": "new name"
                });
            });
    });

});

