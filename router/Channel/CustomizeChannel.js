const express = require('express');

const Router = express.Router();

const Channels = require('../../model/Channel/Channel')

const ChannelImg = require('../../model/Channel/Channel_Img')

const Multer = require('../FileUploder/multer')
const Uploader = require('../FileUploder/Uploader')


Router.post('/updateChannelName', async (req, res) => {
    try {
        
        const {channel_id , name} = req.body;
        const channel = await Channels.updateOne({_id : channel_id},{
            $set : {
                name : name
            }
        });


        await channel.save();

        res.status(200).send({
            message : 'Channel saved successfully'
        })

    } catch (error) {
        
    }
})

Router.post('/updateChannelAbout', async (req, res) => {
    try {
        
        const {channel_id , about} = req.body;
        const channel = await Channels.updateOne({_id : channel_id},{
            $set : {
                about : about
            }
        });


        await channel.save();

        res.status(200).send({
            message : 'Channel saved successfully'
        })

    } catch (error) {
        
    }
})

Router.post('/updateChannelImg/:id', Multer.single('file')  ,async (req, res) => {
    try {
        var channel = await ChannelImg.findOne({id : req.params.id})


        if(channel.img !== ''){
            await Uploader.DeleteFile(channel.img, 'image');
        }

        var file = '';
        console.log(req.file.path);
        
        await Uploader.UploadFile(req.file.path, 'image').then((res) => {
            file = res;
        })

        console.log(file);

        await ChannelImg.updateOne({id : req.params.id},{
            $set : {
                img : file
            }
        })

        console.log(channel);

        res.status(200).send(channel)

    } catch (error) {
        
    }
})





module.exports = Router;