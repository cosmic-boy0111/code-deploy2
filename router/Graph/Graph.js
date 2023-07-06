
const express = require('express')
const router = express.Router();

const WebGraph = require('../../model/Graph/Graph')

router.get('/increaseUser', async (req, res) => {
    try {

        const webGraph = await WebGraph.findOne({})

        var arr = webGraph.users;
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        arr[currentMonth] += 1;

        const result = await WebGraph.updateOne({},{
            $set : {
                users : arr
            }
        })

        res.status(200).json({
            message : 'increase user'
        })

    } catch (error) {
        
    }
})


router.get('/increaseBlog', async (req, res) => {
    try {

        const webGraph = await WebGraph.findOne({})

        var arr = webGraph.blogs;
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        arr[currentMonth] += 1;

        const result = await WebGraph.updateOne({},{
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

router.get('/increaseProblem', async (req, res) => {
    try {

        const webGraph = await WebGraph.findOne({})

        var arr = webGraph.problems;
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        arr[currentMonth] += 1;

        const result = await WebGraph.updateOne({},{
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


router.get('/increaseCourse', async (req, res) => {
    try {

        const webGraph = await WebGraph.findOne({})

        var arr = webGraph.courses;
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        arr[currentMonth] += 1;

        const result = await WebGraph.updateOne({},{
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


router.get('/getWebGraphData', async (req, res) => {
    try {
        
        const data = await WebGraph.findOne({});
        res.status(200).send(data);

    } catch (error) {
        
    }
})




module.exports = router