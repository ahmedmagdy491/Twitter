const express = require('express');
const router = express.Router();
const Post = require('../../schemas/PostsSechema')
const User = require('../../schemas/UserSchema')

router.get('/', (req, res, next)=>{

})


router.post('/', async (req, res, next)=>{

    if (!req.body.content) {
        console.log("No content to send with request");
        return res.sendStatus(400)
    }

    var postData = {
        content : req.body.content,
        postedBy: req.session.user
    }
    try{
        var newPost = await Post.create(postData)
        await User.populate(newPost, {path: "postedBy"})
        res.status(201).send(newPost)
    } catch(err){
        console.log(err)
        res.sendStatus(400)
    }
})

module.exports = router