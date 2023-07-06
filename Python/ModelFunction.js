const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const express = require('express');

const Router = express.Router();

const Multer = require('../router/FileUploder/multer')

const Videos = require('../model/Channel/Videos')
const PlayList = require('../model/Channel/Play_list');
const UserCourseLibrary = require('../model/UserCourses/userCoursesLibrary')
const Thumbnails = require('../model/Channel/Thumbnails')
const LikeBlogs = require('../model/Blog/LikeBlogs')
const Blog = require('../model/Blog/Blog');



Router.post('/generate_caption', Multer.single('file'), async (req, res) => {
    // console.log(file);

    var file = req.file;


    const sourceFile = file.path;
    const destinationFolder = 'Python/ImageToCaption/sample_images';

    // Create destination folder if it doesn't exist
    if (!fs.existsSync(destinationFolder)) {
        fs.mkdirSync(destinationFolder);
    }

    const fileName = path.basename(sourceFile);
    const destinationFile = path.join(destinationFolder, fileName);

    // Copy file
    fs.copyFileSync(sourceFile, destinationFile);

    const pythonProcess = spawn('python', ['-u', './Python/ImageToCaption/generate.py', 'generate_caption']);
    var result = "";
    pythonProcess.stdout.on('data', (data) => {
        result = data.toString();
        console.log(`The final output of program : ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        const folderPath = './Python/ImageToCaption/sample_images';

        fs.readdir(folderPath, (err, files) => {
            if (err) {
                console.error(err);
            } else {
                // Loop through each file and delete it
                files.forEach(file => {
                    const filePath = path.join(folderPath, file);
                    fs.unlink(filePath, err => {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log(`Deleted file: ${filePath}`);
                        }
                    });
                });
            }
        });

        res.status(200).send({
            result: result,
        })
    });
}

)



Router.post('/suggestedCourseAccordingToTitles', async (req, res) => {
    try {

        const { userId } = req.body;

        const userCourse = await UserCourseLibrary.findOne({ userId: userId })

        const playlists = await PlayList.find();

        console.log("playlist",playlists);
        var data = [];

        var titles = [];

        
        for (let i = 0; i < playlists.length; i++) {
            const element = playlists[i];
            const vData = await Thumbnails.findOne({ id: element.videos[0] });
            if (vData === null) continue;
            if(userCourse !== null){

                userCourse.coursesArray.forEach((ele) => {
                    if(ele == element._id){
                        titles.push(element.name)
                    }
                })
            }
            data.push({
                _id: element._id,
                name: element.name,
                description: element.description,
                course_tags: element.course_tags,
                firstVideoId: element.videos[0],
                videoCount: element.videos.length,
                createdAt: element.createdAt,
                playListImg: vData.file
            })
        }

        
        if (titles.length > 0) {
            console.log(titles);
            console.log(data);
            const pythonProcess = spawn('python', ['Python/CourseSuggestion/CourseSuggestion.py', JSON.stringify(data), JSON.stringify(titles)]);

            // Listen for data coming from the Python process and print it to the console
            pythonProcess.stdout.on('data', (data) => {
                const sortedVideos = JSON.parse(data.toString());
                console.log('sorted Video',sortedVideos);
                res.status(200).send(sortedVideos);
            });
        } else {
            res.status(200).send(data);
        }


    } catch (error) {

    }
})

Router.post('/suggestedBlogsAccordingToLikeBlogs', async (req, res) => {
    try {

        const { id } = req.body;
        const liker = await LikeBlogs.findOne({id : id});
        
        
        const blogs = await Blog.find();

        if(liker === null){
            res.status(200).send(blogs)
        }
        
        const blogArray = liker.blogArray;
        var titles = [];
        
        blogs.forEach(element => {
            blogArray.forEach((e)=>{
                if(e == element._id){
                    titles.push(element.headerTitle);
                    return;
                }
            })
        });
       

        if (titles.length > 0) {
            const pythonProcess = spawn('python', ['Python/BlogSuggestion/BlogSuggestion.py', JSON.stringify(blogs), JSON.stringify(titles)]);

            // Listen for data coming from the Python process and print it to the console
            pythonProcess.stdout.on('data', (data) => {
                const sortedCourses = JSON.parse(data.toString());
                // console.log(sortedCourses);
                res.status(200).send(sortedCourses);
            });
        } else {
            res.status(200).send(blogs);
        }

    } catch (error) {

    }
})



Router.post(`/videoRecommendationWithBulkTitles`, async (req, res) => {
    try {
        const {titles} =  req.body;

        const videos = await Videos.find();

        const pythonProcess = spawn('python', ['Python/VideoRecommendation/VideoRecommendation.py', JSON.stringify(videos), JSON.stringify(titles)]);

        // Listen for data coming from the Python process and print it to the console
        pythonProcess.stdout.on('data', (data) => {
            const sortedVideos = JSON.parse(data.toString());
            console.log(sortedVideos);
            res.status(200).send(sortedVideos);
        });



    } catch (error) {

    }
})

Router.get(`/videoRecommendation/:title`, async (req, res) => {
    try {
        const titles = [req.params.title];

        const videos = await Videos.find();

        const pythonProcess = spawn('python', ['Python/VideoRecommendation/VideoRecommendation.py', JSON.stringify(videos), JSON.stringify(titles)]);

        // Listen for data coming from the Python process and print it to the console
        pythonProcess.stdout.on('data', (data) => {
            const sortedVideos = JSON.parse(data.toString());
            console.log(sortedVideos);
            res.status(200).send(sortedVideos);
        });



    } catch (error) {

    }
})



module.exports = Router