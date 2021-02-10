const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';


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
        default: '/images/profilePic.png'
    }
    
}, {timestamps: true})


/* bcrypt.genSalt(saltRounds, function(err,salt){
    bcrypt.hash(myPlaintextPassword, saltRounds, function(err,hash){

    })
}) */

module.exports = mongoose.model('User', UserSchema)