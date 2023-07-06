const express = require('express')

const router = express.Router();

const Blog = require('../../model/Blog/Blog')
const Search = require('../../model/Search/Search')
const BlogFiles = require('../../model/Blog/BlogFiles')

const Multer = require('../FileUploder/multer')
const Uploader = require('../FileUploder/Uploader')



router.post('/createBlog', async (req, res) => {
    const {
        headerTitle,
        // file ,
        description,
        userId,
        likeCount
    } = req.body
    try {
        const data = new Blog({
            headerTitle,
            // file ,
            description,
            userId,
            likeCount
        })
        await data.save();

        const search = new Search({
            id: data._id,
            title: headerTitle,
            tag: 'blog',
            user_id: userId
        })

        await search.save();

        const blogFile = new BlogFiles({
            id: data._id,
            file: ''
        })


        await blogFile.save()

        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({
            message: 'channel not created'
        })
    }
})



router.post('/addBlogFile', Multer.single('file'), async (req, res) => {
    try {
        // const {id,img} = req.body;
        // const url = req.protocol + '://' + req.get('host')
        // let file = url + '/blog/' + req.file.filename

        const { id, type } = req.body;
        var file = '';

        await Uploader.UploadFile(req.file.path, type).then((res) => {
            file = res;
        })

        console.log(file, type);

            const data = await BlogFiles.updateOne({ id: id }, {
                $set: {
                    file: file
                }
            });

        res.status(200).send(data);



    } catch (error) {
        console.log(error);
    }
})


router.get('/getBlogFile/:id', async (req, res) => {
    try {
        const file = await BlogFiles.findOne({ id: req.params['id'] });
        if (!file) {
            res.status(200).send({
                file: ''
            })
        } else {
            res.status(200).send({
                file: file.file
            })
        }
    } catch (error) {
        res.status(400)
    }
})



router.get('/getBlogs', async (req, res) => {
    try {
        const data = await Blog.find();
        if (data) {
            res.status(200).send(data)
        } else {
            res.send([])
        }
    } catch (error) {
        res.status(400).send({ 'message': 'data not found' })
    }
})

router.get('/getBlog/:id', async (req, res) => {
    try {
        const data = await Blog.findOne({ _id: req.params['id'] });
        if (data) {
            res.status(200).send(data)
        } else {
            res.send({})
        }
    } catch (error) {
        res.status(400).send({ 'message': 'data not found' })
    }
})

router.get('/userBlogs/:id', async (req, res) => {
    try {
        const data = await Blog.find({ userId: req.params['id'] });
        if (data) {
            res.status(200).send(data)
        } else {
            res.send([])
        }
    } catch (error) {
        res.status(400).send({ 'message': 'data not found' })
    }
})

router.get('/deleteBlog/:id', async (req, res) => {
    try {
        await Blog.deleteOne({ _id: req.params.id });

        const user = await BlogFiles.findOne({ id: req.params.id })

        if (user.file !== "") {
            var delete_type = user.file.split('/')[4];
            await Uploader.DeleteFile(user.file, delete_type);
        }

        await BlogFiles.deleteOne({ id: req.params.id });

        res.status(200).send({ 'message': 'blog deleted successfully' })

    } catch (error) {
        res.status(400).send({ 'message': 'data not found' })
    }
})

router.post('/updateBlog', async (req, res) => {
    const { id, headerTitle, file, description } = req.body;
    try {
        const data = await Blog.updateOne({ _id: id }, {
            $set: {
                headerTitle: headerTitle,
                description: description
            }
        });

        const search = await Search.updateOne({ id: id }, {
            $set: {
                title: headerTitle
            }
        })

        res.status(200).send(data);
    } catch (error) {
        res.status(400).send({ 'message': 'not updated' })
    }
})



router.post('/updateBlogFile', Multer.single('file'), async (req, res) => {
    try {
        // const {id,img} = req.body;
        // const url = req.protocol + '://' + req.get('host')
        // let file = url + '/blog/' + req.file.filename

        const { id, type } = req.body;


        const user = await BlogFiles.findOne({ id: id })

        console.log(user);

        if (user.file !== "") {
            var delete_type = user.file.split('/')[4];
            Uploader.DeleteFile(user.file, delete_type);
        }

        console.log(user);
        var file = '';

        await Uploader.UploadFile(req.file.path, type).then((res) => {
            file = res;
        })

        console.log(file);


        await BlogFiles.updateOne({ id: id }, {
            $set: {
                file: file
            }
        });
        res.status(200).send({
            message: 'File updated successfully'
        });



    } catch (error) {
        console.log(error);
    }
})

router.get('/addLike/:id', async (req, res) => {
    try {
        const blog = await Blog.findOne({ _id: req.params['id'] })
        const like = await blog.addLike();
        res.status(200).send({
            message: 'like added'
        })
    } catch (error) {
        res.status(400).send({ 'message': 'not updated' })
    }
})

router.get('/subLike/:id', async (req, res) => {
    try {
        const blog = await Blog.findOne({ _id: req.params['id'] })
        const like = await blog.subLike();
        res.status(200).send({
            message: 'like subtracted'
        })
    } catch (error) {
        res.status(400).send({ 'message': 'not updated' })
    }
})


module.exports = router;