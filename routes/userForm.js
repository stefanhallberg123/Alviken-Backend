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
  const orderNumber = await Booking.findOne({
    orderNumber: req.body._customerId,
  });

  res.send(orderNumber);
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

  res.send(booking);
});

router.patch("admin/edit/:id", async (req, res) => {
  const updatedData = await Booking.updateOne({ id: req.params.id });
  (id.comment = req.body.comment),
    (id.date = req.body.date),
    (id.timeslot = req.body.timeslot),
    (id.qty = req.body.qty),
    (id.user = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    }),
    await updatedData.save();
  console.log(id);

  res.send(updatedData);
});

router.get("/admin/edit/:id", async (req, res) => {
  const id = await Booking.findById({_id: req.params.id})
  console.log(id);
  res.send(id);
});
console.log("userForm 1s")

router.delete("/admin/delete/:id", async (req, res) => {
  console.log(req.params.id, "userfrom2")
  const deletedData = await Booking.findByIdAndRemove(
    req.params.id,
  );

  res.send(deletedData);
});

module.exports = router;


// router.post("admin/edit/id", async (req, res) => {
//   const booking = await Booking.updateOne({ id: req.body.customerId });
//   (booking.comment = req.body.comment),
//     (booking.date = req.body.date),
//     (booking.timeslot = req.body.timeslot),
//     (booking.qty = req.body.qty),
//     (booking.user = {
//       name: req.body.name,
//       email: req.body.email,
//       phone: req.body.phone,
//     }),
//     await booking.save();
//   console.log(booking);

//   res.send("Successful");
// });