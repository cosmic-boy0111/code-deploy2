const mongoose = require('mongoose')


const commentContainerSchema = new mongoose.Schema({

    targetId : {
        type : String,
        default : ""
    },

    commentArray : {
        type : Array,
        default : []
    }

})

commentContainerSchema.methods.addComment = async function (data) {
    try {
        this.commentArray = this.commentArray.concat(data);
        this.save();
        return '';
    } catch (error) {
        console.log(error);
    }
}

commentContainerSchema.methods.deleteComment = async function (arr){
    try {
        this.commentArray = [...arr]
        this.save();
        return '';

    } catch (error) {
        console.log(error);
    }
}

const CommentContainer = mongoose.model('COMMENTCONTAINER', commentContainerSchema)

module.exports = CommentContainer;