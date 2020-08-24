const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: {type: String, required: true }
});

const bookingSchema = new mongoose.Schema({
    comment: { type: String, required: true },
    date: { type: Date, required: true }, 
    timeslot: { type: String, required: true },
    qty: {type: String, required: true},
});

const User = mongoose.model("user", userSchema)
const Booking = mongoose.model("booking", bookingSchema)

module.exports = User;
module.exports = Booking;