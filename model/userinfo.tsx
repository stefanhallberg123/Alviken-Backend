import { createSchema, Type, typedModel } from 'ts-mongoose';

export const UserSchema = createSchema({
        customerid: Type.number ({ required: true }), // Tror detta skapas av sig själv?
        firstname: Type.string ({ required: true }),
        lastname: Type.string ({ required: true }),
        email: Type.string ({ required: true }),
        phone: Type.string ({ required: true }),
        comment: Type.string ({ required: true }),
        date: Type.date ({ default: Date.now as any }),
        timeslot: Type.string ({ required: true }), // Är inte säker på om timesloten är en string eller number?
        qty: Type.number ({ required: true })
    })

    export const User = typedModel('User', UserSchema);