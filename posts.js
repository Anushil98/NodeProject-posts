const mongoose =  require('mongoose')
const schema = mongoose.Schema

const postSchema = new schema({
    username:{type:String,required:true},
    title:{type: String,required:true},
    content:{type: String, required:true},
    starred:{type: Boolean}
})

module.exports = mongoose.model('POST',postSchema)
