const express = require('express');

const mongoose = require('mongoose');
const bcrypt = require('bcrypt')


const USER = require('./user')
const POST = require('./posts')

const bodyparser = require('body-parser')

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
    if (req.session.username !== '') {
        req.session.username = ''
        return res.status(200).end()
    }
    res.status(200).end()
})

app.post('/user', (req, res, next) => {

    USER.findOne({ 'username': req.body.username })
        .then((result) => {
            if (result === null) {
                res.status(404);
                return res.end();
            }
            bcrypt.compare(req.body.password, result.password, function (err, result) {
                if (result === true) {
                    req.session.username = req.body.username
                    res.status(200)
                    return res.end()
                } else {
                    res.status(404);
                    return res.end();
                }
            })

        })
        .catch((err) => { console.log(err) })

})
app.use('/post', (req, res, next) => {
    if (req.session.username == '') {
        console.log('No logged user in client')
        res.status(404)
        return res.end()
    }
    next()
})

app.post('/post', (req, res, next) => {

    const username = req.session.username
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
    const username = req.session.username
    POST.aggregate([{ $match: { 'username': username } }, { $match: { starred: star } }])
        .then((docs) => {

            return res.status(200).send(docs)
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
                    console.log('starred')
                    return res.status(200).end()
                })
                .catch((err) => {
                    console.log(error)
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
            console.log('edited')
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