
const express = require('express');
const router = express.Router();

const UserCourse = require('../../model/UserCourses/userCourses');


router.post('/add_video_course', async (req, res) => {
    try {
        const { userId,  courseId , videoId } = req.body;
        const user = await UserCourse.findOne({userId: userId, courseId: courseId});
        if(user) {
            const add = await user.addVideo(videoId);
        }else{
            const userCourse = new UserCourse({
                userId: userId,
                courseId: courseId,
                videoArray: [videoId]
            });
            await userCourse.save();
        }
        res.status(200).send("video course added");
    } catch (error) {
        console.log(error);
    }
})

router.get('/get_course_videos/:userId/:courseId', async (req, res) => {
    try {
        const user = await UserCourse.findOne({userId : req.params['userId'], courseId : req.params['courseId']});
        if(user != null) {
            res.status(200).send(user.videoArray);
            
        }
        res.status(200).send([]);
    } catch (error) {
        console.log(error);
    }
})




module.exports = router;