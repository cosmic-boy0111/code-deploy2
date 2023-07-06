const mongoose = require('mongoose')


const userCourseSchema = new mongoose.Schema({
    userId : { type: String},
    courseId : { type: String},
    videoArray : {  type: Array, default: [] }
})

userCourseSchema.methods.addVideo = async function(id){
    try {
        var found = this.videoArray.find((video_id)=>id === video_id);
        if(!found){
            this.videoArray.push(id);
        }
        await this.save();
        return '';
    } catch (error) {
        console.log(error);
    }
}

const UserCourse = mongoose.model('UserCourseVideoArray', userCourseSchema);
module.exports = UserCourse;