const mongoose = require('mongoose')


const UserCourseLibrarySchema = new mongoose.Schema({
    userId: {type : String, required: true},
    coursesArray: { type : Array, default : []}
});


UserCourseLibrarySchema.methods.addCourse = async function(id){
    try {
        var found = this.coursesArray.find((course_id)=>id === course_id);
        if(!found && id !== ''){
            this.coursesArray.push(id);
        }
        await this.save();
        return '';
    } catch (error) {
        console.log(error);
    }
}

const UserCourseLibrary = mongoose.model('UserCourseLibrary', UserCourseLibrarySchema);
module.exports = UserCourseLibrary;

