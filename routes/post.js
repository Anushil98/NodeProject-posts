const express = require('express')
const Router = express.Router()
const POST = require('../posts')
Router.use('/post',require('connect-ensure-login').ensureLoggedIn('/user'), (req, res, next) => {
    next()
})
Router.post('/post', (req, res, next) => {
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

Router.get('/post', (req, res, next) => {
    
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
Router.put('/post', (req, res, next) => {
    POST.updateOne({ '_id': req.body.id }, { $set: { 'title': req.body.title, 'content': req.body.content } })
        .then(() => {
            
            res.status(200).end()
        })
        .catch((err) => { console.log(err) })
})

Router.put('/post/star', (req, res, next) => {
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


Router.delete('/post', (req, res, next) => {

    POST.findByIdAndDelete({ '_id': req.body.id })
        .then(() => {
            res.status(200).end()
        })
        .catch((err) => { return res.status(404).res.end() })
})



module.exports = Router