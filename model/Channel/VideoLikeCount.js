const mongoose = require('mongoose')

const videoLikeCount = new mongoose.Schema({
    id : {
        type : String,
    },
    likeCount : {
        type : Number,
        default : 0
    }
})

videoLikeCount.methods.increaseCount = async function(){
    try {

       this.likeCount += 1;
       this.save();

       return this.likeCount;

    } catch (error) {
        console.log(error);
    }
}


videoLikeCount.methods.decreaseCount = async function(){
    try {

       this.likeCount -= 1;
       this.save();

       return this.likeCount;

    } catch (error) {
        console.log(error);
    }
}

const VideoLikeCount = mongoose.model('VIDEO_LIKE_COUNT', videoLikeCount)
module.exports = VideoLikeCount