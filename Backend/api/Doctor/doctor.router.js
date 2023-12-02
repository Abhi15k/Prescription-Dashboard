const { create, getById ,getPresc, get, update, deleteById} = require("./doctor.controller");
const router = require("express").Router();


router.post("/add", create)
        .post("/:id/added", getById)
        .get("/", get)
        .post("/getPresc", getPresc)
        .post("/:id/update", update)
        .delete("/:id/delete", deleteById);

module.exports = router;