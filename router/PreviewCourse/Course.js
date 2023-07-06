const express = require('express');

const router = express.Router();

const PlayList = require('../../model/Channel/Play_list')
const Thumbnails = require('../../model/Channel/Thumbnails')


router.get('/getPreviewCourse/:id', async (req,res)=>{
    try {
        
        const course = await PlayList.findOne({_id : req.params.id});
        res.status(200).send(course)

    } catch (error) {
        res.status(404).send({})
    }
})

router.get('/previewCourse/thumbnail/:id', async (req, res) => {
    try {
        const thumbnail = await Thumbnails.findOne({id: req.params.id});
        res.status(200).send(thumbnail);
    } catch (error) {
        res.status(400).send({})
    }
})


module.exports = router;