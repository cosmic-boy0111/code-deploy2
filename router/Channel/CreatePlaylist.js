const express = require('express')

const router = express.Router();


const PlayList = require('../../model/Channel/Play_list')
const PlayLists = require('../../model/Channel/PlayLists')
const Videos = require('../../model/Channel/Videos')
const Search = require('../../model/Search/Search')
const Thumbnails = require('../../model/Channel/Thumbnails')


router.post('/createPlaylist',async(req,res)=>{
    const {id,name,description,course_tags} = req.body;
    try {
        const playlist = new PlayList({name : name, description : description, course_tags : course_tags})
        await playlist.save();

        const channel = await PlayLists.findOne({id : id});
        const add = await channel.addPlaylists(playlist._id);

        res.status(200).send(playlist)

    } catch (error) {
        res.status(400).send({
            message : 'playlist not created'
        })
    }
})

router.get('/allPlayLists', async (req,res)=>{
    try {
        const playlists = await PlayList.find();

        console.log('under playlist');
        var data = [];
        

        for (let i = 0; i < playlists.length; i++) {
            const element = playlists[i];
            const vData = await Thumbnails.findOne({id : element.videos[0]});
            if(vData === null) continue;
            data.push({
                _id : element._id,
                course_tags : element.course_tags,
                firstVideoId : element.videos[0],
                name : element.name,
                description : element.description,
                videoCount : element.videoCount,
                createdAt : element.createdAt,
                playListImg : vData.file
            })
        }


        res.status(200).send(data);
    } catch (error) {
        console.log(error);
    }
})


router.get('/getPlaylistById/:id',async(req,res)=>{
    try {
        var playlist = await PlayList.findOne({_id : req.params['id']})
        const data =  await {
            ...playlist,
            name : playlist.name,
            videoCount : playlist.videos.length,
        }
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({
            message : 'playlist not found'
        })
    }
})

router.get('/getPlayLists/:id',async(req,res)=>{
    try {
        const playlists = await PlayLists.findOne({id : req.params['id']});
        const list = await playlists.getPlayLists();
        var Data = []
        
           
        for (let index = 0; index < list.length; index++) {
            var playListImg = ''
            var playlist = await PlayList.findOne({_id : list[index]})
            if(playlist.videos.length >= 1){
                const vData = await Thumbnails.findOne({ id: playlist.videos[0] });
                playListImg = vData.file
            }
            Data.push({
                _id : list[index],
                firstVideoId : playlist.videos[0],
                name : playlist.name,
                description : playlist.description,
                videoCount : playlist.videos.length,
                playListImg : playListImg,
                createdAt : playlist.createdAt
            })
        }

        console.log(Data);


        res.status(200).send(Data);


    } catch (error) {
        console.log(error);
    }
})

router.get('/getPlayListsDataById/:id', async(req,res)=>{
    try {
        console.log(req.params['id']);
        var playlist = await PlayList.findOne({_id : req.params['id']})
        var list = await playlist.getVideos();
        // var obj_ids = list.map(function(id) { return ObjectId(id); });
        const data = await Videos.find({
            '_id': { $in: list}
        })

        res.status(200).send(data);

    } catch (error) {
        res.status(400).send({
            message : 'not found'
        })
    }
})



module.exports = router