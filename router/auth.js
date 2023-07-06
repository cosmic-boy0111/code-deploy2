const { response } = require('express');
const express = require('express')



const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authenticate = require('../middleware/authenticate');

const router = express.Router();

require('../db/conn');
const {
    User
} = require('../model/userSchema')
const UserList = require('../model/Users/userList')
const Blog = require('../model/Blog/Blog')
const ProblemSolution = require('../model/Problems/ProblemSolution')
const {Img, BgImg} = require('../model/Images/images')
const LikeBlogs = require('../model/Blog/LikeBlogs')
const Followers = require('../model/UserAction/Followers')
const UserFollowFollowersCount = require('../model/UserAction/FollowCount')

const Channels = require('../model/Channel/Channel')
const ChannelList = require('../model/Channel/ChannelList')
const PlayLists = require('../model/Channel/PlayLists')
const ChannelImg = require('../model/Channel/Channel_Img')
const Search = require('../model/Search/Search')
const VideoWatch = require('../model/Channel/VideoWatch')



const HistoryVideo = require('../model/Channel/Library/HistoryVideo')
const LikedVideo = require('../model/Channel/Library/LikedVideos')
const LibraryPlayLists = require('../model/Channel/Library/PlayLists')
const WatchLater = require('../model/Channel/Library/WatchLater')
const WebGraph = require('../model/Graph/Graph')
const UserGraph = require('../model/Graph/UserGraph')

const Multer = require('./FileUploder/multer')
const Uploader = require('./FileUploder/Uploader')

///////////////// user //////////////// 

router.post('/registerUser',async(req,res)=>{
    const { name,email,password,cPassword,key } = req.body
    if( !name || !email || !password || !cPassword || !key ){
        return res.status(422).json({error:'error'});
    }

    try {
        const userExits =  await  User.findOne({email:email});

        if(userExits){
            return res.status(422).json({error:'user already exist'})
        }

        const data = new User({name,email,password,cPassword,key});
        await data.save();

        console.log(data);

        const search = new Search({
            id : data._id,
            title : name,
            tag : 'user'
        })

        await search.save();

        const user = new UserList({id : data._id,name,email})
        await user.save();
        const user1 = new Img({id : data._id})
        await user1.save();
        const user2 = new BgImg({id : data._id})
        await user2.save();
        const user3 = new LikeBlogs({id : data._id})
        await user3.save();
        const user4 = new Followers({id: data._id});
        await user4.save();
        const user5 = new UserFollowFollowersCount({id: data._id});
        await user5.save();
        const user6 = new ChannelList({id: data._id});
        await user6.save();


        const channel = new Channels({name,joinDate : new Date()})
        await channel.save();

        const historyVideo = new HistoryVideo({id : channel._id})
        await historyVideo.save();

        const likedVideo = new LikedVideo({id : channel._id})
        await likedVideo.save();

        const libraryPlayLists = new LibraryPlayLists({id : channel._id})
        await libraryPlayLists.save();

        const watchLater = new WatchLater({id : channel._id})
        await watchLater.save();

        const searchChannel = new Search({
            id : channel._id,
            title : name,
            user_id : data._id,
            tag : 'channel'
        })

        await searchChannel.save();


        const playlists = new PlayLists({id : channel._id})
        await playlists.save();

        const channel_img = new ChannelImg({id  : channel._id})
        channel_img.save();

        const addActiveChannel = await data.addActiveChannel(channel._id);
        const add = await user6.addChannel(channel._id);


        const graph = await WebGraph.findOne({})
        if(graph === null){
            var result = await new WebGraph();
            await result.save();
        }

        const userGraph = await new UserGraph({
            userId : data._id
        });

        await userGraph.save();


        res.status(200).json({ message: 'user registered' })

    } catch (error) {
        console.log(error);
    }
});


// login route

router.post('/signin', async (req,res)=>{
    console.log('in signin');
    try {
        let token;
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                error:'plz fill the data'
            })
        }

        const userLogin = await User.findOne({email:email});

        // console.log(userLogin);
        if(userLogin){
            console.log(User);
            const isMatch = await bcrypt.compare(password, userLogin.password);

            const token = await userLogin.generateAuthToken();

            console.log(token);

            res.cookie("jwToken",token,{
                expires: new Date(Date.now() + 25892000000),
                httpOnly:true
            })

            if(!isMatch){
                res.status(400).json({
                    error:'invalid credentials'
                });
            }else{
                res.json({
                    message:'user sign in successfully'
                });
            }
        }else{
            res.status(400).json({
                error:'invalid credentials'
            });
        }

    } catch (error) {
        res.json({
            error:'error'
        });
    }
})

// get user data for contact us and home page


router.get('/getUser/:id', async (req,res)=>{
    try {

        console.log(req.params['id']);
        const data = await User.findOne({_id: req.params['id']});
        if(data){
            res.status(201).send(data)
        }else{
            res.status(400).json({
                error:'invalid'
            });
        }
    } catch (error) {
        res.status(400).json({
            error:'invalid'
        });
    }

})


router.post('/updateUser3',async(req,res)=>{
    const {id,password,cPassword} = req.body;
    console.log(req.body);
    try {

        console.log(password,cPassword);

        var bpassword = await bcrypt.hash(password, 12);
        var bcpassword = await bcrypt.hash(cPassword, 12);

        const user = await User.updateOne({_id:id},{
            $set : {
                password: bpassword,
                cPassword : bcpassword
            }
        });

        // console.log(user);  
        res.status(200).json({
            message:'user update'
        });      

    } catch (error) {
        console.log(error);
    }

})

router.get('/about', authenticate , (req,res)=>{
    console.log(`hello my about`);
    res.send(req.rootUser);
})



router.get('/logout', (req,res)=>{
    console.log(`hello my logout page`);
    res.clearCookie('jwToken',{path:'/'})
    res.status(200).json({ message:'user logout'});
})

router.post('/deleteUser', async(req,res)=>{
    const {id} = req.body;
    try {
        const user = await User.deleteOne({_id:id})
        const search = await Search.deleteOne({id : id})
        const userList = await UserList.deleteOne({id:id})
        const problem = await ProblemSolution.deleteOne({id:id})
        res.status(200).json({
            msg:'user delete'
        });
    } catch (error) {
        console.log(error);
    }
})


router.post('/addImg/:id', Multer.single('file') ,  async (req,res)=>{
    try {

        console.log(req.file);

        var img = '';
        const user = await Img.findOne({id : req.params['id']})

        console.log(user);

        if(user.img){
            await Uploader.DeleteFile(user.img, 'image');
        }

        await Uploader.UploadFile(req.file.path, 'image').then((res) => {
            img = res;
        })
        
        console.log(img);

        const add = await Img.updateOne({id : req.params.id},{
            $set : {
                img : img
            }
        })
        res.status(200).json({
            img : img
        })
       
    } catch (error) {
        console.log(error);
    }
})


router.post('/addBgImg/:id', Multer.single('file'),  async (req,res)=>{
    try {
        
        var img = '';

        const user = await BgImg.findOne({id : req.params['id']});

        if(user.bgImg !== ""){
            await Uploader.DeleteFile(user.bgImg, 'image');
        }

        await Uploader.UploadFile(req.file.path, 'image').then((res) => {
            img = res;
        })

        console.log(img);

        const add = await BgImg.updateOne({id : req.params.id},{
            $set : {
                bgImg : img
            }
        });

        res.status(200).json({
            bgImg : img
        })
       
    } catch (error) {
        console.log(error);
    }
})


router.post('/updateUser',async(req,res)=>{
    const {id,name,email,about,profession,socialLinks} = req.body;
    try {
        const user = await User.updateOne({_id:id},{
            $set : {
                name:name,
                email:email,
                about: about,
                profession : profession,
                socialLinks : socialLinks
            }
        });

        const search = await Search.updateOne({id : id},{
            $set  :{
                title : name
            }
        })

        console.log(search);

        const user2 = await UserList.updateOne({id:id},{
            $set : {
                name:name,
                email:email,
                profession : profession,
            }
        });

        // console.log(user); 
        res.status(200).json({
            message:'user update'
        });      

    } catch (error) {
        console.log(error);
    }

})

router.get('/users',async(req,res)=>{
    try {
        const Data = await  User.find();
        
        res.status(200).send(Data)
    } catch (error) {
        res.status(400).send({
            message : 'error'
        })
    }
})




module.exports = router