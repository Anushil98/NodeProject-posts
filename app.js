const express = require('express');

const mongoose = require('mongoose');

const bodyparser = require('body-parser')

const session = require('express-session')

const MongoDbStore = require('connect-mongodb-session')(session)

const cors = require('cors')

var app = express()
const MONGOURI = 'mongodb+srv://Anushil:7sPH6ssTWMtqnh7C@clusternode-rzps1.mongodb.net/test?retryWrites=true&w=majority'
const store = new MongoDbStore({
    uri: 'mongodb+srv://Anushil:7sPH6ssTWMtqnh7C@clusternode-rzps1.mongodb.net/test?retryWrites=true&w=majority',
    collection:'sessions'
})
app.use(cors({credentials:true,origin:'http://localhost:3001'}))

app.use(session({secret:'codeacious-secret-node-project', resave: false, saveUninitialized: false,
cookie:{secure:false},store:store}))

app.use(bodyparser.json())

app.post('/signup',(req,res,next)=>{
    
})

app.post('/user',(req,res,next)=>{
    console.log(req.body)
    req.session.loggedIn = true
    console.log(req.session)
    res.end()
})

app.post('/post',(req,res,next)=>{
    console.log(req)
})

app.get('/post',(req,res,next)=>{
    console.log(req.session.loggedIn)
    res.end()
})

app.delete('/post',(req,res,next)=>{
    console.log(req)
})

app.use('/',(req,res,next)=>{
    res.status(404).write("<h1>Error reached no valid api end</h1>")
    return res.end()
})   
// 7sPH6ssTWMtqnh7C
mongoose.connect('mongodb+srv://Anushil:7sPH6ssTWMtqnh7C@clusternode-rzps1.mongodb.net/test?retryWrites=true&w=majority')
.then((result)=>{
    console.log("Connected to database")
    app.listen(3000)
}).catch((err)=>{
    console.log(err)
})