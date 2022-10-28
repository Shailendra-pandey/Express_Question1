import mongoose from "mongoose";
const Schema = mongoose.Schema;

const tshirt_schema = new Schema({
    title: { type: String, require: true },
    price: { type: String, require: true },

}, { timestamps: true });

const tshirt = mongoose.model('tshirt', tshirt_schema);

export {tshirt};