const router = require("express").Router();

let Booking = require("../model/booking.schema");

router.get("/", async (req, res) => {
  //console.log(Booking)
  const booking = await Booking.find({});
  res.send(booking)
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
  const orderNumber = await Booking.findOne({
    orderNumber: req.body._customerId,
  });
});
router.get("/admin", async (req, res) => {
  const bookings = await Booking.find();
  console.log(bookings);
  res.send(bookings);
});
router.post("/admin/create", async (req, res) => {
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
router.post("/admin/edit/id", async (req, res) => {
  const booking = await Booking.updateOne({ _id: req.body._customerId })
  booking.comment = req.body.comment,
   booking.date =req.body.date,
    booking.timeslot = req.body.timeslot,
    booking.qty = req.body.qty,
    booking.user = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone
    }, await booking.save()
    console.log(booking);
  });
  router.post("admin/delete/id", async(req, res ) => {
    await Booking.deleteOne({
      _id: req.params._customerId
    })
  });

module.exports = router;
