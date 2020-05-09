const cote = require('cote')
const POST = require('../posts')
const conn = require('../mongooseConnect')

var postResponder = new cote.Responder({
    name:'post responder',
    key: 'postServiceKey',
    respondsTo:['addpost','getpost','editpost','starpost','deletepost']
})

postResponder.on('addpost',function(req,cb){
    const newpost = new POST({
        username: req.post.username,
        title: req.post.title,
        content: req.post.content,
        starred: req.post.starred
    })
    // console.log(newpost)
    newpost.save().then(()=>{
        // console.log("Success")
        cb()
    }).catch((err)=>{
        console.log(err)
        cb()
    })
    
})

postResponder.on('getpost',function(req,cb){
    POST.aggregate([{ $match: { 'username': req.username } }, { $match: { starred: req.star } }])
        .then((docs) => {
            return cb(docs)
        })
        .catch((err) => {
            return cb(err)
        })
})

postResponder.on('editpost',function(req,cb){
    POST.updateOne({ '_id': req.id }, { $set: { 'title': req.title, 'content': req.content } })
        .then(() => {
            cb()
        })
        .catch((err) => { cb(err) })
})

postResponder.on('starpost',function(req,cb){
    POST.findOne({ _id: req.id })
        .then((doc) => {
            if (doc === null) {
                return cb(404)
            }
            POST.updateOne({ _id: doc._id }, { $set: { starred: !doc.starred } })
                .then(() => {
                    
                    return cb(200)
                })
                .catch((err) => {
                    console.log(err)
                    cb(err)
                })
        })
        .catch((err) => {
            console.log(err);
            cb(err)
        })
})

postResponder.on('deletepost',function(req,cb){
    POST.findByIdAndDelete({ '_id': req.id })
        .then(() => {
            cb(200)
        })
        .catch((err) => { cb(404) })
})
