const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto')


const userSchema = new Schema ({
    username: {type: String , required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password : {type: String},
    phone: {type: String},
    registrationDate : {type : Date, default : Date.now()},
    img : {type : String, data : Buffer, },
    token : {type : String},
    hash : String, 
    salt : String,
    admin : Boolean,
    reflections : {
        type : Schema.Types.ObjectId, ref: "Reflections"
    }
});

const userModel = mongoose.model ('User', userSchema);
module.exports = userModel;

