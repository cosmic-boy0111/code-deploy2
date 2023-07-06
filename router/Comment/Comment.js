const express = require('express')

const router = express.Router();

const Comment = require('../../model/Comment/Comment');
const CommentContainer = require('../../model/Comment/CommentContainer');


router.post('/addComment', async (req, res) => {
    try {

        const {
            userId,
            targetId,
            text
        } = req.body;

        const comment = new Comment({
            userId: userId,
            text: text,
            date : new Date()
        })

        await comment.save();

        const commentContainer = await CommentContainer.findOne({
            targetId: targetId
        })

        if(commentContainer){
            await commentContainer.addComment(comment._id);
        }else{
            const newCommentContainer = new CommentContainer({
                targetId: targetId
            })
            await newCommentContainer.addComment(comment._id);
        }


        res.status(200).send(comment);
        
    } catch (error) {
        res.status(400).send({
            message : 'Error adding comment'
        })
    }
})

router.get('/getCommentById/:id', async (req, res) => {
    try {
        
        const comment = await Comment.findOne({
            _id : req.params.id
        })

        res.status(200).send(comment);

    } catch (error) {
        console.log(error);
    }
})

router.post('/editComment', async (req, res) => {
    try {
        
        const {CommentId, text} = req.body;

        const comment = await Comment.updateOne({_id : CommentId},{
            $set : {
                text : text
            }
        } )

        res.status(200).send(comment);

    } catch (error) {
        console.log(error);
    }
})


router.post('/deleteComment', async (req, res) => {
    try {

        const {arr,CommentId,targetId} = req.body;
        
        
        await Comment.deleteOne({_id : CommentId});
        
        const commentContainer = await CommentContainer.findOne({ targetId : targetId});

        await commentContainer.deleteComment(arr);


        res.status(200).send({
            message : 'Comment deleted successfully'
        })

    } catch (error) {
        res.status(200).send({
            errormessage : JSON.stringify(error)
        });
    }
})

router.get('/getCommentsByTargetId/:id', async (req, res) => {
    try {
        
        const commentContainer = await CommentContainer.findOne({
            targetId : req.params.id
        })

        if(commentContainer){
            res.status(200).send(commentContainer.commentArray);
        }else{
            res.status(200).send([]);
        }

    } catch (error) {
        console.log(error);
    }
})


module.exports  = router;