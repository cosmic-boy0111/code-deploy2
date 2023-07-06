const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({

    userId : {
        type : String,
        default : ""
    },

    text : {
        type : String,
        default : ""
    },

    date : {
        type : Date,
    }

})



const Comment = mongoose.model('comment', commentSchema);


module.exports = Comment