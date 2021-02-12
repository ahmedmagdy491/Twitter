const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const User = require('../schemas/UserSchema')

router.get('/', (req, res, next)=>{


    if (req.session) {
        req.session.destroy(()=>{
            res.status(200).redirect('/login')
        })
    }
})



module.exports = router