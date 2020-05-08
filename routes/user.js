const express = require('express')
const Router = express.Router()
const passport = require('./auth')
Router.get('/user', (req, res, next) => {
    res.status(404).end()
})
Router.post('/user',passport.authenticate('local',{failureRedirect:'/user'}), (req, res, next) => {
    res.status(200).end()
})

module.exports = Router
