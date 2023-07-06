const express = require('express')

const router = express.Router();

const HistoryVideo = require('../../model/Channel/Library/HistoryVideo')
const LikedVideo = require('../../model/Channel/Library/LikedVideos')
const Videos = require('../../model/Channel/Videos')
const PlayList = require('../../model/Channel/Play_list');
const VideoUrl = require('../../model/Channel/VideoUrl')
const Search = require('../../model/Search/Search')
const VideoWatch = require('../../model/Channel/VideoWatch')
const Thumbnails = require('../../model/Channel/Thumbnails')
const { route } = require('./Channel');

const VideoLikeCount = require('../../model/Channel/VideoLikeCount')
const UserCourse = require('../../model/UserCourses/userCourses');


const Multer = require('../FileUploder/multer')
const Uploader = require('../FileUploder/Uploader')

const fs = require('fs');
const path = require('path');

router.post('/createVideo', async (req, res) => {
    const {
        channel_id,
        playlist_id,
        userId,
        headerTitle,
        description,
        langType,
    } = req.body;

    try {
        const video = new Videos({
            channel_id,
            playlist_id,
            userId,
            headerTitle,
            description,
            langType,
            createAt: new Date()
        })

        await video.save();

        const videoView = new VideoWatch({ id: video._id });
        await videoView.save();

        const search = new Search({
            id: video._id,
            title: headerTitle,
            user_id: userId,
            tag: 'video'
        })
        await search.save();

        const likeCount = new VideoLikeCount({ id: video._id, likeCount: 0 });
        const videoUrl = new VideoUrl({ id: video._id, file: '' })
        const thumbnail = new Thumbnails({ id: video._id, file: '' })
        await likeCount.save();
        await videoUrl.save();
        await thumbnail.save();
        if (playlist_id !== '') {
            const playlist = await PlayList.findOne({ _id: playlist_id })
            const add = await playlist.addVideo(video._id)
        }

        res.status(200).send(video)

    } catch (error) {
        res.status(400).send({
            message: 'video not added'
        })
    }
})

// History video                done    done
// Liked videos                 done    done
// Play lists                   done    done
// User course video array      done    done
// Video watches                done    done
// Thumbnail files              done    done 
// Video urls                   done    done
// Video like counts            done    done
// Videos                       done    done

router.get('/deleteVideo/:video_id', async (req, res) => {
    try {

        const video_id = req.params.video_id;

        const videoUrlObj = await VideoUrl.findOne({ id: video_id });
        const thumbUrlObj = await Thumbnails.findOne({ id: video_id });
        if (videoUrlObj.file) {
            Uploader.DeleteFile(videoUrlObj.file, 'video');
        }
        if (thumbUrlObj.file) {
            Uploader.DeleteFile(thumbUrlObj.file, 'image');
        }

        await Videos.deleteOne({ _id: video_id });
        await UserCourse.updateMany({}, {
            $pull: {
                videoArray: video_id
            }
        })
        await PlayList.updateMany({}, {
            $pull: {
                videos: video_id
            }
        })
        await LikedVideo.updateMany({}, {
            $pull: {
                videos: video_id
            }
        })
        await HistoryVideo.updateMany({}, {
            $pull: {
                videos: video_id
            }
        })
        await VideoWatch.deleteOne({ id: video_id })
        await VideoUrl.deleteOne({ id: video_id });
        await VideoLikeCount.deleteOne({ id: video_id });
        await Thumbnails.deleteOne({ id: video_id });

        res.status(200).send({
            message: "all data of video is deleted successfully"
        })

    } catch (error) {
        console.log(error);
    }
})


router.post('/deleteVideoBulk', async (req, res) => {
    try {

        const { videoIdArray } = req.body;

        videoIdArray.forEach( async (video_id) => {
            const videoUrlObj = await VideoUrl.findOne({ id: video_id });
            const thumbUrlObj = await Thumbnails.findOne({ id: video_id });
            if (videoUrlObj.file) {
                Uploader.DeleteFile(videoUrlObj.file, 'video');
            }
            if (thumbUrlObj.file) {
                Uploader.DeleteFile(thumbUrlObj.file, 'image');
            }

            await Videos.deleteOne({ _id: video_id });
            await UserCourse.updateMany({}, {
                $pull: {
                    videoArray: video_id
                }
            })
            await PlayList.updateMany({}, {
                $pull: {
                    videos: video_id
                }
            })
            await LikedVideo.updateMany({}, {
                $pull: {
                    videos: video_id
                }
            })
            await HistoryVideo.updateMany({}, {
                $pull: {
                    videos: video_id
                }
            })
            await VideoWatch.deleteOne({ id: video_id })
            await VideoUrl.deleteOne({ id: video_id });
            await VideoLikeCount.deleteOne({ id: video_id });
            await Thumbnails.deleteOne({ id: video_id });
        })

        res.status(200).send({
            message: "bulk video is deleted successfully"
        })

    } catch (error) {
        console.log(error);
    }
})

router.post('/addVideoFile/:id', Multer.single('file'), async (req, res) => {
    try {

        var file = '';

        await Uploader.UploadFile(req.file.path, 'video').then((res) => {
            file = res;
        })

        console.log(file);

        const data = await VideoUrl.updateOne({ id: req.params.id }, {
            $set: {
                file: file
            }
        });

        res.status(200).send({
            message: 'file uploaded successfully'
        })

    } catch (error) {
        console.log(error);
    }
})

router.post('/addThumbnailsFile/:id', Multer.single('file'), async (req, res) => {
    try {
        // const {id,img} = req.body;
        var file = '';

        console.log(req.file);

        await Uploader.UploadFile(req.file.path, 'image').then((res) => {
            file = res;
        })

        console.log(file);

        const data = await Thumbnails.updateOne({ id: req.params.id }, {
            $set: {
                file: file
            }
        });

        res.status(200).send({
            message: 'file uploaded successfully'
        })

    } catch (error) {
        console.log(error);
    }
})



router.get('/getVideoById/:id', async (req, res) => {
    try {
        const data = await Videos.findOne({ _id: req.params['id'] })
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({
            message: 'video not found'
        })
    }
})

router.get('/getVideosByField/:field', async (req, res) => {
    try {
        const data = await Videos.find({ field: req.params['field'] })
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({
            message: 'data not found'
        })
    }
})

router.get('/getVideosByLang/:lang', async (req, res) => {
    try {
        const data = await Videos.find({ langType: req.params['lang'] })
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({
            message: 'data not found'
        })
    }
})

router.get('/getVideosByChannel/:id', async (req, res) => {
    try {
        const data = await Videos.find({ channel_id: req.params['id'] })
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({
            message: 'data not found'
        })
    }
})


router.post('/updateVideoTitleDescription', async (req, res) => {
    try {
        const { id, title, description, playlist_id } = req.body;
        await Videos.updateOne({ _id: id }, {
            $set: {
                headerTitle: title,
                description: description,
            }
        });

        const data = await Videos.findOne({ _id: id });


        res.status(200).send(data)

    } catch (error) {
        console.log(error);
    }
})

module.exports = router
