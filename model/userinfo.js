// const mongoose = require("mongoose");
// const Schema = require("mongoose").Schema;

// const UserSchema = new Schema({
//     customerid: Type.number({ required: true }), // Tror detta skapas av sig själv?
//     firstname: Type.string({ required: true }),
//     lastname: Type.string({ required: true }),
//     email: Type.string({ required: true }),
//     phone: Type.string({ required: true }),
//     comment: Type.string({ required: true }),
//     date: Type.date({ default: Date.now }),
//     timeslot: Type.string({ required: true }), // Är inte säker på om timesloten är en string eller number?
//     qty: Type.number({ required: true })
// })
// const User = mongoose.model('User', UserSchema);
// module.exports = User