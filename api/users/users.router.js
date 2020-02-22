const router = require("express").Router();
const { getUsers, getUser, createUser, deleteUser, updateUser } = require("./users.controller");

//users home path
router
    .route("/")
    .get(getUsers)
    .post(createUser)
    .delete(deleteUser)
    .patch(updateUser)

router
    .route("/:id")
    .get(getUser)

module.exports = router