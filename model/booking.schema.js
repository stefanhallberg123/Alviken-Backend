const mongoose = require("mongoose");


// const bookingSchema = new mongoose.Schema({
//     user: {
//         name: { type: String, required: true },
//         email: { type: String, required: true },
//         phone: { type: String, required: true },
//         customerId: { type: Number }
//     },
//     booking: {
//         comment: { type: String },
//         date: { type: Date, required: true },
//         timeslot: { type: String, required: true },
//         qty: { type: String, required: true },
//     },
//     id: { type: String }
// });

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