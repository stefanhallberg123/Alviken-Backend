const mongoose = require("mongoose");

const Booking = new mongoose.Schema({
    comment: { type: String },
    date: { type: Date, },
    timeslot: { type: String, },
    qty: { type: String },
    table: { type: Number, min: 1, max: 15 }, // veta antalet bord? 
    user: {
        name: { type: String },
        email: { type: String },
        phone: { type: String },
        customerId: { type: Number }
    },
});


const BookingSchema = mongoose.model("booking", Booking)

module.exports = BookingSchema;