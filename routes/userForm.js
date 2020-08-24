const router = require("express").Router();

let User = require("../model/userinfo");

router.route("/").get((req, res) => {
    res.send("Hello world");
})

module.exports = router