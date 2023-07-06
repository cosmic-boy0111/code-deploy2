const express = require('express');

const QuizResponses = require('../../model/Quiz/QuizResponses')

const Router = express.Router();

Router.post('/getResponses', async (req, res) => {
    try {
        const {userId, quizId} = req.body;

        const quiz = await QuizResponses.findOne({
            userId : userId,
            quizId : quizId
        })

        res.status(200).send(quiz);

    } catch (error) {
        
    }
})

Router.post('/addQuizResponse', async (req, res) => {
    try {
        
        const {userId, quizId, responser_id, response} = req.body;

        const quiz = await QuizResponses.findOne({
            userId : userId,
            quizId : quizId
        })

        const add = await quiz.addResponse({
            id : responser_id,
            response : response
        })

        res.status(200).send({
            message : 'response added successfully'
        })

    } catch (error) {
        console.log(error);
    }
})


Router.post('/checkAlreadyResponse', async (req, res) => {
    try {

        const {userId, quizId, responser_id} = req.body;

        const quiz = await QuizResponses.findOne({
            userId : userId,
            quizId : quizId
        })

        var flag = false;
        quiz.responses.forEach(element => {
            if(element.id === responser_id) {
                flag = true;
            }
        });

        res.status(200).send({
            present : flag
        })


    } catch (error) {
        
    }
})

module.exports = Router

