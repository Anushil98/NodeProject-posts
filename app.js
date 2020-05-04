const express = require('express');

const mongoose = require('mongoose');

const bodyparser = require('body-parser')

const cors = require('cors')

var app = express()

app.use(cors())

// app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.post('/signup',(req,res,next)=>{
    res.json({
        user_Logged:req.body.username
    })
})

app.post('/login',(req,res,next)=>{
    console.log(req.body)

})

app.post('/addpost',(req,res,next)=>{
    console.log(req)
})

app.use('/getpost',(req,res,next)=>{
    console.log(req)
})

app.post('/deletepost',(req,res,next)=>{
    console.log(req)
})

app.use('/',(req,res,next)=>{
    console.log("rfghj")
    res.status(404).json({
        error: "Error"
    })
})   

mongoose.connect('mongodb+srv://Anushil:b15XwRIwgyMpTYii@clusternode-rzps1.mongodb.net/test?retryWrites=true&w=majority')
.then((esult)=>{
    console.log("Connected to database")
    app.listen(3000)
}).catch((err)=>{
    console.log(err)
})