var express = require('express')
var app = express()
var cors = require('cors')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

const PORT = process.env.PORT || 5000

const authRoutes = require("./routes/auth")
const postRoutes = require('./routes/post')
const {MONGOURI} = require('./config/keys')

app.use(cors())
app.use(bodyParser.json())

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then(console.log('DB CONNECTED'))
.catch(err=>console.log(err))

app.use('/',authRoutes)
app.use('/',postRoutes)

if(process.env.NODE_ENV=='production'){
    app.use(express.static('postapp/build'))
}

app.listen(PORT,()=>{
    console.log(`App is listening at ${PORT}`)
    const path = require('path')
    const cors = require('cors')
    app.use(cors())
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'postapp','build','index.html'))
    })
})

