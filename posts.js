const mongoose =  require('mongoose')
const schema = mongoose.Schema

const postSchema = new schema({
    username:{type:String,required:true},
    title:{type: String,required:true},
    content:{type: String, required:true}
})
//do not use arrow functionin pre middle ware
postSchema.pre('save',function(next){
    var post = this
    
    next()
})

module.exports = mongoose.model('POST',postSchema)
