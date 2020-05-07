const express = require('express');

const mongoose = require('mongoose');
const bcrypt = require('bcrypt')


const USER = require('./user')
const POST = require('./posts')

const bodyparser = require('body-parser')

var passport = require('passport');
var Strategy = require('passport-local').Strategy;

passport.use(new Strategy(
    function (username, password, cb) {
        USER.findOne({ 'username': username })
            .then((doc) => {
                if (doc === null) {
                    return cb(null, false)
                }
                bcrypt.compare(password, doc.password, function (err, result) {
                    if (result === true) {
                        return cb(null, doc)
                    } else {
                        return cb(null, false)
                    }
                })
            })
            .catch((err) => { return cb(err) })
    }))

passport.serializeUser(function (user, cb) {
    cb(null, user.username);
});

passport.deserializeUser(function (username, cb) {
    USER.findOne({ 'username': username })
        .then((doc) => {
            cb(null, doc)
        })
        .catch((err) => {
            cb(err)
        })
});


const session = require('express-session')

const MongoDbStore = require('connect-mongodb-session')(session)

const cors = require('cors')

var app = express()
const MONGOURI = 'mongodb+srv://Anushil:7sPH6ssTWMtqnh7C@clusternode-rzps1.mongodb.net/test?retryWrites=true&w=majority'
const store = new MongoDbStore({
    uri: MONGOURI,
    collection: 'sessions'
})
app.use(cors({ credentials: true, origin: 'http://localhost:3001' }))

app.use(session({
    secret: 'codeacious-secret-node-project', resave: false, saveUninitialized: false,
    cookie: { secure: false }, store: store
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyparser.json())

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
app.get('/user', (req, res, next) => {
    res.status(404).end()
})
app.post('/user',passport.authenticate('local',{failureRedirect:'/user'}), (req, res, next) => {
    res.status(200).end()
})
app.use('/post',require('connect-ensure-login').ensureLoggedIn('/user'), (req, res, next) => {
    next()
})

app.post('/post', (req, res, next) => {
    const username = req.session.passport.user
    const newpost = new POST({
        username: username,
        title: req.body.title,
        content: req.body.content,
        starred: req.body.starred
    })
    newpost.save()
    res.status(200).end()

})

app.get('/post', (req, res, next) => {
    
    const star = req.query.starred === 'true' ? true : false
    const username = req.session.passport.user
    
    POST.aggregate([{ $match: { 'username': username } }, { $match: { starred: star } }])
        .then((docs) => {
            
            return res.status(200).send(docs).end()
        })
        .catch((err) => {
            return res.status(200).end()
        })
})

app.put('/post', (req, res, next) => {
    POST.findOne({ _id: req.body.id })
        .then((doc) => {
            if (doc === null) {
                return res.status(404).end()
            }
            POST.updateOne({ _id: doc._id }, { $set: { starred: !doc.starred } })
                .then(() => {
                    
                    return res.status(200).end()
                })
                .catch((err) => {
                    console.log(err)
                    res.status(404).end()
                })
        })
        .catch((err) => {
            console.log(err);
            res.status(404).end();
        })
})

app.delete('/post', (req, res, next) => {

    POST.findByIdAndDelete({ '_id': req.body.id })
        .then(() => {
            res.status(200).end()
        })
        .catch((err) => { return res.status(404).res.end() })
})

app.post('/editpost', (req, res, next) => {
    POST.updateOne({ '_id': req.body.id }, { $set: { 'title': req.body.title, 'content': req.body.content } })
        .then(() => {
            
            res.status(200).end()
        })
        .catch((err) => { console.log(err) })
})

app.use('/', (req, res, next) => {
    res.status(404).write("<h1>Error reached no valid api end</h1>")
    return res.end()
})
// 7sPH6ssTWMtqnh7C
mongoose.connect('mongodb+srv://Anushil:7sPH6ssTWMtqnh7C@clusternode-rzps1.mongodb.net/test?retryWrites=true&w=majority')
    .then((result) => {
        console.log("Connected to database")
        app.listen(3000)
    }).catch((err) => {
        console.log(err)
    })