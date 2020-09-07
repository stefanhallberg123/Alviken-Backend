const router = require("express").Router();

let Booking = require("../model/booking.schema");

const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "resturangalviken@gmail.com",
    pass: "alviken123",
  },
});

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
  const mail = await Booking.findOne({ id: req.body._id }).sort({ _id: -1 });
  let mailOptions = {
    from: "alviken@gmail.com",
    to: mail.user.email,
    subject: "Reservations Alviken",
    html: `<h1>Hej ${mail.user.name}! </h1>
    <p>Tack För dig bokning!</p>`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  res.send(booking + mail);
});

router.get("/thankyou", async (req, res) => {
  const id = await Booking.findOne({ id: req.body._id }).sort({ _id: -1 });
  res.send(id);
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
router.post("admin/edit/id", async (req, res) => {
  const booking = await Booking.updateOne({ id: req.body.customerId });
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

router.get("/admin/edit/:id", async (req, res) => {
  const id = await Booking.findById({ _id: req.params.id });
  console.log(id);
  res.send(id);
});

router.delete("admin/delete/id", async (req, res) => {
  await Booking.deleteOne({
    _id: req.params._customerId,
  });

  res.send("successful");
});

module.exports = router;
