const express = require('express');
const conn = require('./mongooseConnect')
const cote = require('cote')
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
const signupRequester = new cote.Requester({
    name: 'sign up requester',
    key:'signupService'
})

app.get('/signup',require('connect-ensure-login').ensureLoggedIn('/redirect'),(req,res,next)=>{
    res.status(300).end()
})
app.get('/redirect',(req,res,next)=>{
    res.status(200).end()
})
app.post('/signup', (req, res, next) => {
    const user = {
        username: req.body.username,
        password: req.body.password
    }
    console.log("Hey")
    signupRequester.send({type:'signup',user:user},function(err){
        if(err==200){
            res.status(200).end()
        }
        else{
            res.status(404).end()
        }
    })
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

app.listen(3000)

