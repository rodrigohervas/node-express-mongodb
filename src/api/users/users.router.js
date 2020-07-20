const express = require("express")
const UsersController = require("./users.controller")

const usersRouter = express.Router();

usersRouter
    .route("/")
    .get(UsersController.getUsers)
    .post(UsersController.createUser)
    

usersRouter
    .route("/:id")
    .get(UsersController.getUser)
    .delete(UsersController.deleteUser)
    .patch(UsersController.updateUser)

module.exports = usersRouter