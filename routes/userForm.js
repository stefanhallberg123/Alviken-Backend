const router = require("express").Router();

let Booking = require("../model/booking.schema");

router.get("/", async (req, res) => {
    const comment = await Booking.find();
});

router.get("/add", (req, res) => {
    res.send("hello")
})
router.post("/add", async (req, res) => {

    const newComment = await new Booking({ comment: req.body.comment, user: { name: req.body.name, } }).save();
    console.log(newComment);
})

module.exports = router;
