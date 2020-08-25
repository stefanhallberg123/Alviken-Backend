const mongoose = require("mongoose");

const Booking = new mongoose.Schema({
    comment: { type: String },
    date: { type: Date },
    timeslot: { type: String, default: Date.now },
    qty: { type: String },
    user: {
        name: { type: String },
        email: { type: String },
        phone: { type: String },
        customerId: { type: Number }
    },
});


const BookingSchema = mongoose.model("booking", Booking)

module.exports = BookingSchema;