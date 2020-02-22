const mongoose = require("mongoose");
const User = require("./users.model");

//define actions/methods
module.exports = {

    getUsers(req, res, next) {
        try {
            User.find()
                .then(users => res.status(200).json(users))
                .catch(error =>
                    next({ message: 'error after getting users' })
                )
        }
        catch (error) {
            console.log('erro status: ', error)
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
            next({ message: 'error while creating user' })
        }
    },

    deleteUser(req, res, next) {
        const id = req.body.id;
        try {
            User.deleteOne({ _id: id })
                .then(() => res.status(204).json("user deleted"))
                .catch(error =>
                    next({ message: 'error deleting user' })
                )
        }
        catch (error) {
            next({ message: 'error while deleting user' })
        }

    },

    updateUser(req, res, next) {
        const user = req.body;
        try {
            User.updateOne(
                { _id: user.id }, //find criteria
                { //update values
                    name: user.name,
                    telephone: user.telephone,
                    email: user.email,
                    position: user.position,
                    company: user.company
                }
            )
                .then(user => res.status(200).json(user))
                .catch(error =>
                    next({ message: 'error after updating user', status: 201 })
                )
        }
        catch (error) {
            next({ message: 'error while updating user' })
        }
    }
}