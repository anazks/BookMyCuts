const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName:{
        type : String,
        required : true,
        maxlenght : 40
    },
    lastName:{
        type : String,
        required : true,
        maxlenght : 100
    },
    mobileNo:{
        type : String,
        required : true,
        maxlenght : 100
    },
    city:{
        type : String,
        required : true
    },
    password:{
        type : String,
        required : true
    },
    role:{
        type:String,
        default:'user'
    }
})

module.exports = mongoose.model('User',UserSchema);