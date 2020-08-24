const router = require("express").Router();

let User = require("../model/userinfo");

router.get("/", (req, res) => {
    res.send("Hello world");
});

module.exports = router