const { create, presc,getById , get,getTrack, ViewPresc,UpdatePrice,update, deleteById} = require("./add.conrtoller");
const router = require("express").Router();


router.post("/add", create)
       .post("/presc", presc)
        .get("/:id", getById)
        .get("/", get)
        
        // .post("/:id/update", update)
        .delete("/:id/delete", deleteById);

module.exports = router;