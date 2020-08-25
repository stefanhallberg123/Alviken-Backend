const router = require("express").Router();

let Booking = require("../model/booking.schema");

router.get("/", async (req, res) => {
    const comment = await Booking.find();
});

router.get("/add", (req, res) => {
    res.send("hello")
})
router.post("/add", async (req, res) => {

    const newComment = await new Booking({ comment: req.body.comment, date: req.body.date, timeslot: req.body.timeslot, qty: req.body.qty, user: { name: req.body.name, email: req.body.email, phone: req.body.phone, customerId: req.body.customerId } }).save();
    console.log(newComment);
})

module.exports = router;
