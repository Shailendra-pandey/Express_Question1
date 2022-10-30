import mongoose from "mongoose";
const Schema = mongoose.Schema;

const mobile_schema = new Schema(
  {
    mobileName: { type: String, require: true },
    price: { type: String, require: true },
    specification: { type: Object },
  },
  { timestamps: true }
);

const mobile = mongoose.model("mobile", mobile_schema);

export { mobile };
