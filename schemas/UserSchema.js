const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required: true,
        trim: true
    },
    lastName:{
        type:String,
        required: true,
        trim: true
    },
    username:{
        type:String,
        required: true,
        unique: true,
        trim: true
    },
    email:{
        type:String,
        required: true,
        unique: true,
        trim: true
    },
    password:{
        type:String,
        required: true,
    },
    profilePic:{
        type:String,
        default: '/images/profilePic.jpg'
    }
    
}, {timestamps: true})


module.exports = mongoose.model('User', UserSchema)