const express = require('express');

const Router = express.Router();

const UserCourseLibrary = require('../../model/UserCourses/userCoursesLibrary')

const Videos = require('../../model/Channel/Videos')
const PlayList = require('../../model/Channel/Play_list')

Router.post('/add_course_in_library', async (req, res) => {
    try {
        const {userId, courseId} = req.body;
        const user = await UserCourseLibrary.findOne({userId: userId});
        if (user) {
            const add = await user.addCourse(courseId);
        }else{
            const userCourse = new UserCourseLibrary({
                userId: userId,
                coursesArray: [courseId]
            });
            await userCourse.save();
        }

        res.status(200).json({
            message: 'Course added successfully'
        })

    } catch (error) {
        console.log(error);
    }
})

Router.get('/get_user_courses/:id',async (req,res)=>{
    try {
        const playlists = await UserCourseLibrary.findOne({userId : req.params['id']});
        const list = playlists.coursesArray;
        var Data = []
        
           
        for (let index = 0; index < list.length; index++) {
            if(list[index] === "") continue;
            var playListImg = ''
            var playlist = await PlayList.findOne({_id : list[index]})
            if(playlist.videos.length >= 1){
                const data = await Videos.findOne({_id : playlist.videos[0]});
                // if(data){
                //     playListImg = data.thumbnail;
                // }
                if(data){
                    playListImg = data.thumbnail;
                }else{
                    playListImg = "";
                }
            }
            Data.push({
                _id : list[index],
                firstVideoId : playlist.videos[0],
                name : playlist.name,
                description : playlist.description,
                videoCount : playlist.videos.length,
                playListImg : playListImg
            })
        }


        res.status(200).send(Data);

    } catch (error) {
        console.log(error);
        res.status(200).send([])
    }
})


module.exports = Router;