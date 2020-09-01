const express = require('express')
const bcrypt = require('bcryptjs')
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const {SECRET} = require("../config/keys")

const router = express.Router()

router.post('/signup',(req,res)=>{
    const {name,email,password} = req.body
    if(!name || !email || !password){
        res.status(422).json({error:'Please fill out all the fields!'})
    }
   User.findOne({email:email})
    .then(user=>{
        if(user){
           return res.status(422).json({error:'User aleready exists!'})
        }

        bcrypt.hash(password,12)
            .then(hashedpassword=>{
                const newuser = new User({
                    name,
                    email,
                    password:hashedpassword
                })
                newuser.save()
                    .then(user=>{
                        return res.json(user)
                    })
                    .catch(err=>console.log(err))
            })

    }).catch(err=>console.log(err))
})

router.post('/login',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
       return res.status(422).json({error:'Please provide all credentials!'})
    }
    User.findOne({email:email})
        .then(user=>{
            if(!user){
               return res.status(422).json({error:'Invalid email or password!'})
            }
            bcrypt.compare(password,user.password)
                .then(match=>{
                    if(match){
                        //res.json({message:'Logged in Successfully!'})
                        const token = jwt.sign({_id:user._id},SECRET)
                        const {_id,name,email} = user
                        return res.json({token,user:{_id,name,email}})
                    }else{
                        return res.json({message:'Email and Password does not match!'})
                    }
                }).catch(err=>console.log(err))

        }).catch(err=>console.log(err))
})


module.exports = router