const router = require("express").Router();
require("dotenv").config();

let Booking = require("../model/booking.schema");

const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.user,
    pass: process.env.password,
  },
});

router.get("/", async (req, res) => {
  const booking = await Booking.find();
  res.send(booking);
});

router.post("/", async (req, res) => {
  const booking = await new Booking({
    table: 1,
    comment: req.body.comment,
    date: req.body.date,
    timeslot: req.body.timeslot,
    qty: req.body.qty,
    user: {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    },
  }).save();
  const mail = await Booking.findOne({ id: req.body._id }).sort({ _id: -1 });
  let mailOptions = {
    from: process.env.user,
    to: mail.user.email,
    subject: "Reservations Alviken",
    html: `<h1>Hej ${mail.user.name}! </h1>
    <p>Tack För dig bokning!</p>
    <p>Ditt ordernummer är: ${mail._id}</p>
    <p>Om vi behöver nå dig så ringer vi på: ${mail.user.phone} eller skickar ett mejl på ${mail.user.email} </p>`,
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
    table: 1,
    comment: req.body.comment,
    date: req.body.date,
    timeslot: req.body.timeslot,
    qty: req.body.qty,
    user: {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    },
  }).save();
  let mailOptions = {
    from: process.env.user,
    to: booking.user.email,
    subject: "Reservations Alviken",
    html: `<h1>Hej ${booking.user.name}! </h1>
    <p>Tack För dig bokning!</p>
    <p>Ditt ordernummer är: ${booking._id}</p>
    <p>Om vi behöver nå dig så ringer vi på: ${booking.user.phone} eller skickar ett mejl på ${booking.user.email} </p>`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  res.send(booking);
});

router.put("admin/edit/id", async (req, res) => {
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
  let mailOptions = {
    from: process.env.user,
    to: booking.user.email,
    subject: "Reservations Alviken",
    html: `<h1>Hej ${booking.user.name}! </h1>
      <p>Vi har nu ändrat din bokning!</p>
      <p>Ditt ordernummer är: ${booking._id}</p>
      <p>Om vi behöver nå dig så ringer vi på: ${booking.user.phone} eller skickar ett mejl på ${booking.user.email} </p>`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  res.send(booking);
});

router.get("/admin/edit/:id", async (req, res) => {
  const id = await Booking.findById({ _id: req.params.id });
  console.log(id);
  res.send(id);
});

router.delete("admin/delete/id", async (req, res) => {
  const user = await Booking.deleteOne({
    _id: req.params._customerId,
  });

  let mailOptions = {
    from: process.env.user,
    to: user.user.email,
    subject: "Reservations Alviken",
    html: `<h1>Hej ${user.user.name}! </h1>
      <p>Vi har nu ändrat din bokning!</p>
     <p> Vi har nu tagit bort din bokning på order: ${user._customerId}</p>
     <p>Hör gärna av dig ifall du vill boka om igen</p>`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  res.send(booking);
});

module.exports = router;
