const jwt = require('jsonwebtoken')
const {SECRET} = require('../config/keys')
const User = require('../models/User')
const mongoose = require('mongoose')

exports.requireLogin= (req,res,next) => {
    const {authorization} = req.headers
    if(!authorization){
        res.status(404).json({message:'U need to login first!'})
    }
    const token = authorization.replace('Bearer ',"")
    jwt.verify(token,SECRET,(err,payload)=>{
        if(err){
            return res.status(401).json({error:'U must be logged in!'})
        }

        const {_id} = payload
        User.findById(_id).then(userdata=>{
            req.user = userdata
            next()
        })
    })
}

