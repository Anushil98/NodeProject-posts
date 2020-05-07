const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const schema = mongoose.Schema
const post = require('./posts')
const userSchema = new schema({
    username: { type:String,required:true},
    password: {type:String,required:true},
})

userSchema.pre('save',function(next){
    if(this.password) {                                                                                                                                                        
        var salt = bcrypt.genSaltSync(12)                                                                                                                                     
        this.password  = bcrypt.hashSync(this.password, salt)
        
        next()                                                                                                                
    }  
})




module.exports = mongoose.model('USER',userSchema);
