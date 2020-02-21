const mongoose =require('mongoose')

const userSessionSchema = new mongoose.Schema({
     userId:{
         type:String,
         default:' '
     },
     timestamp:{
        type:Date,
        default:Date.now()
     },
     isDelete:{
        type:Boolean,
        default:false
     }
})

module.exports = mongoose.model('userSession', userSessionSchema);