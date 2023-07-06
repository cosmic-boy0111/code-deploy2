const express = require('express');

const Router = express.Router();

const VideoLikeCount = require('../../model/Channel/VideoLikeCount')

Router.get('/getVideoLikeCount/:video_id', async (req, res) => {
    try {
        
        const video = await VideoLikeCount.findOne({ id: req.params.video_id});
        res.status(200).send(video);

    } catch (error) {
        
    }
})


module.exports = Router