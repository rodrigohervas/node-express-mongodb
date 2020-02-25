const router = require("express").Router();
const { getUsers, getUser, createUser, deleteUser, updateUser } = require("./users.controller");

router
    .route("/")
    .get(getUsers)
    .post(createUser)
    

router
    .route("/:id")
    .get(getUser)
    .delete(deleteUser)
    .patch(updateUser)

module.exports = router