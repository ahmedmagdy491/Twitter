const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../schemas/UserSchema')
const bcrypt = require('bcrypt')


router.get('/',  (req, res, next)=>{
    res.status(200).render('register')
})
router.post('/', async (req, res, next)=>{
    var firstName = req.body.firstName.trim();
    var lastName = req.body.lastName.trim();
    var username = req.body.username.trim();
    var email = req.body.email.trim();
    var {password} = req.body
    var payload = req.body
    
    if (firstName && lastName && username && email && password) {
        
        
        const user = await User.findOne({
                $or:[
                    {username},
                    {email}
                ]
        }).catch( (error) => {
            console.log(error)
            payload.errorMessage = "Something went wrong."
            res.status(400).render('register', payload)
        })

        if (user == null) {
            // no user found
        
            var data = req.body
            data.password = await bcrypt.hash(password, 10)
            User.create(data)
                .then((user)=>{
                    req.session.user = user;
                    return res.redirect("/")
                })
        }
        else{
            // user found
            if (email == user.email) {
                payload.errorMessage = "Email already in use."
            }   else{
                payload.errorMessage = "Username already in use."
            }
            res.status(400).render('register', payload)
        }
       
    } else {
        payload.errorMessage = "Make sure that each field has a valid value!"
        res.status(200).render('register', payload)
    }
})

module.exports = router