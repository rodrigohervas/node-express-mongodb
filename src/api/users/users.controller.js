const mongoose = require("mongoose")
const User = require("./users.model")
const logger = require('../../logger')


//define actions/methods
const UsersController = {



    getUsers(req, res, next) {
        try {
            User.find()
                .then(users => res.status(200).json(users))
                .catch(error =>
                    next({ message: 'error after getting users' })
                )
        }
        catch (error) {
            logger.error(`${error.message} at users.controller.getUsers`)
            next({ message: 'error while getting users' })
        }
    },

    getUser(req, res, next) {
        const { id = 0 } = req.params;
        try {
            User.findById(id)
                .then(user => res.status(200).json(user))
                .catch(error =>
                    next({ message: 'error after getting user', status: 404 })
                )
        }
        catch (error) {
            logger.error(`${error.message} at users.controller.getUser`)
            next({ message: 'error while getting user' })
        }
    },

    createUser(req, res, next) {
        const user = req.body;
        try {
            User.create(user)
                .then(user => res.status(200).json(user))
                .catch(error =>
                    next({ message: 'error after creating user', status: 201 })
                )
        }
        catch (error) {
            logger.error(`${error.message} at users.controller.createUser`)
            next({ message: 'error while creating user' })
        }
    },

    deleteUser(req, res, next) {
        const id = req.params.id;
        try {
            User.findById(id)
                .then(result => {
                    if (!result) {
                        next({ message: 'no user found', status: '404'})
                    }
                })
                .catch(error =>
                    next({ message: 'no user for provided id' })
                )
            
            User.deleteOne({ _id: id })
                .then( result => res.status(200).json(`${result.deletedCount} user deleted`) )
                .catch(error =>
                    next({ message: 'error deleting user' })
                )
        }
        catch (error) {
            logger.error(`${error.message} at users.controller.deleteUser`)
            next({ message: 'error while deleting user' })
        }

    },

    updateUser(req, res, next) {
        const user = req.body;
        const userId = req.params.id
        try {
            User.updateOne(
                { _id: userId }, //find criteria
                { //update values
                    name: user.name,
                    telephone: user.telephone,
                    email: user.email,
                    position: user.position,
                    company: user.company
                }
            )
                .then(result => {
                    res.status(200).json(`${result.nModified} user updated`)
                })
                .catch(error =>
                    next({ message: 'error updating user', status: '400' })
                )
        }
        catch (error) {
            logger.error(`${error.message} at users.controller.updateUser`)
            next({ message: 'error while updating user' })
        }
    }
}

module.exports = UsersController