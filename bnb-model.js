const mongoose = require('mongoose')
const bnbSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    valueofBNB:String,
    timeStamp:String

})

module.exports = mongoose.model('BNB',bnbSchema)