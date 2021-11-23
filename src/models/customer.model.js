import mongoose from 'mongoose';

const customerSchema = mongoose.Schema({
    name: { type: String, unique: false, require: true },
    email: { type: String, unique: true, require: true },
    planet: { type: String, unique: false, require: true },
    coord:
    {
        lon: { type: Number, min: -1000, max: 1000, required: true },
        lat: { type: Number, min: -1000, max: 1000, required: true },
    },
    phone: { type: String, require: true, maxLenght: 16 },
    birthday: { type: Date, require: true },
    referalCode: { type: String, require: true },
},
    {
        collection: 'customers',
        strict: 'throw'
    }
);

export default mongoose.model('Customer', customerSchema);