const mongoose = require('mongoose')
const conn = mongoose.createConnection('mongodb+srv://Anushil:7sPH6ssTWMtqnh7C@clusternode-rzps1.mongodb.net/test?retryWrites=true&w=majority')

module.exports = conn