const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const User = require('../schemas/UserSchema')

router.get('/', (req, res, next)=>{
    res.status(200).render('login')
})


router.post('/', async (req, res, next)=>{

    var payload = req.body
    if (req.body.logUserName && req.body.logUserPassword) {
        const user = await User.findOne({
                $or:[
                    {username: req.body.logUserName},
                    {email: req.body.logUserName}
                ]
            }).catch( (error) => {
                    console.log(error)
                    payload.errorMessage = "Something went wrong."
                    res.status(404).render('login', payload)
        })

        if (user != null) {
            var result = await bcrypt.compare(req.body.logUserPassword, user.password)
            if (result === true) {
                req.session.user = user;
                return res.redirect("/")
            }
        }

        payload.errorMessage = "Login Credentials Incorrect."
        return res.status(401).render('login', payload)
    }else {
        payload.errorMessage = "Make sure that each field has a valid value!"
        res.status(400).render('login', payload)
    }
})

module.exports = router