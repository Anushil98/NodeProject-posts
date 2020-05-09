const express = require('express')
const Router = express.Router()
const POST = require('../posts')
const cote = require('cote')

var postServiceRequester = new cote.Requester({
    name: 'post service requester',
    key: 'postServiceKey'
})

Router.use('/post',require('connect-ensure-login').ensureLoggedIn('/user'), (req, res, next) => {
    next()
})
Router.post('/post', (req, res, next) => {
    const username = req.session.passport.user
    const newpost = {
        username: username,
        title: req.body.title,
        content: req.body.content,
        starred: req.body.starred
    }
    postServiceRequester.send({type:'addpost',post: newpost},function(err,response){
        return res.status(200).end()
    })
})
Router.get('/post', (req, res, next) => {
    const star = req.query.starred === 'true' ? true : false
    const username = req.session.passport.user
    postServiceRequester.send({type:'getpost',username: username, star: star},function(response,err){
        return res.status(200).send(response).end()
    })
})
Router.put('/post', (req, res, next) => {
    postServiceRequester.send({type:'editpost',id:req.body.id , title:req.body.title,content: req.body.content },function(response,err){
        return res.status(200).end()
    })
})
Router.put('/post/star', (req, res, next) => {
    postServiceRequester.send({type:'starpost',id: req.body.id},function(err,response){
        if(err === 200){
            res.status(200).end()
        }
        else{
            res.status(404).end()
        }
    })
})


Router.delete('/post', (req, res, next) => {
    postServiceRequester.send({type:'deletepost',id:req.body.id},function(err){
        if(err===200){
            res.status(200).end()
        }
        else{
            return res.status(404).res.end()
        }
    })
})



module.exports = Router