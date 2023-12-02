const { create , get} = require("./company.controller");
const router = require("express").Router();


router.post("/add", create)
        .get("/", get);
        

module.exports = router;






