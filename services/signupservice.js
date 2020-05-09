const cote = require('cote')
const USER = require('../user')
const conn = require('../mongooseConnect')

var signUpResponder = new cote.Responder({
    name:'sign up responder',
    key:'signupService',
    respondsTo:['signup']
})

signUpResponder.on('signup',function(req,cb){
    console.log('from sign up responder')
    const user = new USER({
        username: req.user.username,
        password: req.user.password
    })
    USER.findOne({ 'username': req.user.username }).then((doc) => {
        if (doc != null) {
            cb(404)
        }
        user.save()
        cb(200)
    }).catch((err) => cb(404))
})



