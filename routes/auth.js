
const bcrypt = require('bcrypt')
const USER = require('../user')

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


module.exports = passport