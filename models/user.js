import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName:{type:String, require:true},
    lastName:{type:String, require:true},
    userName:{type:String, require:true, unique:true},
    email:{type:String, require:true, unique:true},
    password:{type:String, require:true},
    
},{timestamps:true});

export default mongoose.model('User', userSchema, 'userdetails');