const mongoose = require('mongoose')

const schema = mongoose.Schema
const post = require('./posts')
const userSchema = new schema({
    username: { type:String,required:true},
    password: {type:String,required:true},
})

userSchema.pre('save',function(next){
    next()
})

module.exports = mongoose.model('USER',userSchema);
