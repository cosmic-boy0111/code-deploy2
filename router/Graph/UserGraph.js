
const express = require('express')
const router = express.Router();

const UserGraph = require('../../model/Graph/UserGraph')


router.get('/increaseUserBlog/:id', async (req, res) => {
    try {

        const userGraph = await UserGraph.findOne({
            userId : req.params.id
        })

        var arr = userGraph.blogs;
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        arr[currentMonth] += 1;

        const result = await UserGraph.updateOne({ userId : req.params.id },{
            $set : {
                blogs : arr
            }
        })

        res.status(200).json({
            message : 'increase blogs'
        })

    } catch (error) {
        
    }
})

router.get('/increaseUserProblem/:id', async (req, res) => {
    try {


        const userGraph = await UserGraph.findOne({
            userId : req.params.id
        })

        var arr = userGraph.problems;
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        arr[currentMonth] += 1;

        const result = await UserGraph.updateOne({ userId : req.params.id },{
            $set : {
                problems : arr
            }
        })

        res.status(200).json({
            message : 'increase problems'
        })

    } catch (error) {
        
    }
})


router.get('/increaseUserCourse/:id', async (req, res) => {
    try {
        const userGraph = await UserGraph.findOne({
            userId : req.params.id
        })

        var arr = userGraph.courses;
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        arr[currentMonth] += 1;

        const result = await UserGraph.updateOne({ userId : req.params.id },{
            $set : {
                courses : arr
            }
        })

        res.status(200).json({
            message : 'increase courses'
        })

    } catch (error) {
        
    }
})


router.get('/getUserGraphData/:id', async (req, res) => {
    try {
        
        const data = await UserGraph.findOne({ userId : req.params.id });
        res.status(200).send(data);

    } catch (error) {
        
    }
})




module.exports = router