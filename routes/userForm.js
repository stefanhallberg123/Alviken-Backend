const router = require("express").Router();

let Booking = require("../model/booking.schema");

router.get("/", async (req, res) => {
  const booking = await Booking.find();
});

router.post("/", async (req, res) => {
  const booking = await new Booking({
    table: 1, // antal som läggs till?
    comment: req.body.comment,
    date: req.body.date,
    timeslot: req.body.timeslot,
    qty: req.body.qty,
    user: {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      // customerId: req.body.customerId,
    },
  }).save();
  console.log(booking);
});

router.get("/thankyou", async (req, res) => {
  const orderNumber = await Booking.findOne({ orderNumber: req.body._id });
});

module.exports = router;
