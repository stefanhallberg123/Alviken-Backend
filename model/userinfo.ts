import { createSchema, Type, typedModel } from 'ts-mongoose';

const UserSchema = createSchema({
    customerid: Type.number ({ required: true }), // Tror detta skapas av sig själv?
    firstname: Type.string ({ required: true }),
    lastname: Type.string ({ required: true }),
    email: Type.string ({ required: true }),
    phone: Type.string ({ required: true })
});


const BookingSchema = createSchema({
    date: Type.date ({ default: Date.now as any }),
    timeslot: Type.string ({ required: true }),
    qty: Type.number ({ required: true }),
    comment: Type.string ({ required: true })
});

export const User = typedModel('User', UserSchema);
export const Booking = typedModel('Booking', BookingSchema);