const router = require("express").Router();

let Booking = require("../model/booking.schema");

router.get("/", async (req, res) => {
  const booking = await Booking.find();
  res.send(booking);
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

  res.send(booking);
});

router.get("/thankyou", async (req, res) => {
  const customerId = await Booking.findOne(
    {},
    {},
    { sort: { created_at: -1 } },
    function (err, post) {
      console.log(post);
    }
  );

  res.send(customerId);
});
router.get("/admin", async (req, res) => {
  const booking = await Booking.find({});
  res.send(booking);
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

  res.send("successful");
});
router.put("admin/edit/id", async (req, res) => {
  const booking = await Booking.updateOne({ _id: req.body._customerId });
  (booking.comment = req.body.comment),
    (booking.date = req.body.date),
    (booking.timeslot = req.body.timeslot),
    (booking.qty = req.body.qty),
    (booking.user = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    }),
    await booking.save();
  console.log(booking);

  res.send("Successful");
});
router.delete("admin/delete/id", async (req, res) => {
  await Booking.deleteOne({
    _id: req.params._customerId,
  });

  res.send("successful");
});

module.exports = router;
