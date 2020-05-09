const mongoose =  require('mongoose')
const schema = mongoose.Schema
const conn = require('./mongooseConnect')

const postSchema = new schema({
    username:{type:String,required:true},
    title:{type: String,required:true},
    content:{type: String, required:true},
    starred:{type: Boolean}
})

module.exports = conn.model('POST',postSchema)
