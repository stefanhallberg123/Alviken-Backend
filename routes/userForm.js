const router = require("express").Router();

let Booking = require("../model/booking.schema");

router.get("/", async (req, res) => {
    const comment = await Booking.findOne({ comment: req.body.booking.comment })
});

router.post("/add", async (req, res) => {

    const newComment = await new Booking({ comment: req.body.comment }).save();
    console.log(newComment);
})

module.exports = router;
