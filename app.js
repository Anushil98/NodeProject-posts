const express = require('express');
const mongoose = require('mongoose');

const passport = require('./routes/auth')

const userroutes = require('./routes/user')
const postroutes = require('./routes/post')

const bodyparser = require('body-parser')

const session = require('express-session')
const MongoDbStore = require('connect-mongodb-session')(session)
const cors = require('cors')

// 7sPH6ssTWMtqnh7C connection password
const MONGOURI = 'mongodb+srv://Anushil:7sPH6ssTWMtqnh7C@clusternode-rzps1.mongodb.net/test?retryWrites=true&w=majority'
const store = new MongoDbStore({
    uri: MONGOURI,
    collection: 'sessions'
})

var app = express()
app.use(cors({ credentials: true, origin: 'http://localhost:3001' }))
app.use(session({
    secret: 'codeacious-secret-node-project', resave: false, saveUninitialized: false,
    cookie: { secure: false }, store: store
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyparser.json())

//SignUp routes
app.use('/signup',require('connect-ensure-login').ensureLoggedIn('/redirect'),(req,res,next)=>{
    res.status(300).end()
})
app.get('/redirect',(req,res)=>{
    res.status(200).end()
})
app.post('/signup', (req, res, next) => {
    const user = new USER({
        username: req.body.username,
        password: req.body.password
    })
    USER.findOne({ 'username': req.body.username }).then((doc) => {
        if (doc != null) {
            return res.status(404).end()
        }
        user.save()
        res.status(200).end()

    }).catch((err) => console.log(err))
})
app.get('/logout', (req, res, next) => {
    req.logout()
    res.status(200).end()
})

//login or user routes
app.use(userroutes)
//post routes
app.use(postroutes)

app.use('/', (req, res, next) => {
    res.status(404).write("<h1>Error reached no valid api end</h1>")
    return res.end()
})

mongoose.connect(MONGOURI)
    .then((result) => {
        console.log("Connected to database")
        app.listen(3000)
    }).catch((err) => {
        console.log(err)
    })