import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    userName: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },

}, { timestamps: true });

const accessSchema = new Schema({
    user_id: { type: String, require: true },
    access_token: { type: String, require: true },
    expiresAtnow:{
        type:Date,
        default: Date.now(),
        expires: 3600, 
    }
});

const addressSchema = new Schema({
    user_id: { type: String, require: true },
    address: { type: String, require: true },
    city: { type: String, require: true },
    state: { type: String, require: true },
    pin_code: { type: Number, require: true },
    phone_no: { type: Number, require: true }
})

const user = mongoose.model('User', userSchema, 'userdetails');
const access_token = mongoose.model('access_token', accessSchema);
const addressSc = mongoose.model('address', addressSchema);

export { user, access_token, addressSc };