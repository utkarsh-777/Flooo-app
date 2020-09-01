const express = require('express')
const { requireLogin } = require('../middlewares/loginRequired')
const router = express.Router()
const Post = require("../models/Post")

router.post('/createpost',requireLogin,(req,res)=>{
    const {title,description,image} = req.body
    if(!title || !description){
        return res.status(422).json({
            message:'Enter all fields!'
        })
    }
    const newpost = new Post({
        title,
        description,
        image,
        postedBy:req.user
    })
    newpost.save()
        .then(post=>{
            return res.json(post)
        })
        .catch(err=>console.log(err))
})

router.get('/allposts',requireLogin,(req,res)=>{
    Post.find()
    .populate("postedBy","name email")
        .then(posts=>{
            if(!posts){
                return res.status(404).json({
                    message:'Posts Not Found!'
                })
            }
            return res.json(posts)
        }).catch(err=>console.log(err))
})

module.exports = router