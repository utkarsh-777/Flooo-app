const mongoose = require('mongoose')
const {ObjectId} = mongoose.SchemaTypes

const User = require("./User")

const PostSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
    },
    postedBy:{
        type:ObjectId,
        ref:"User"
    }
},{timestamps:true})

module.exports = mongoose.model('Post',PostSchema)