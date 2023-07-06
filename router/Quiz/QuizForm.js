const express = require('express');

const Router = express.Router();

const PrepareQuiz = require('../../model/Quiz/PrepareQuiz')


Router.get('/getFormQuiz/:id', async (req,res)=>{
    try {
        
        const Quiz = await PrepareQuiz.findOne({
            _id: req.params.id,
        })

        res.status(200).send(Quiz);

    } catch (error) {
        console.log(error);
    }
})





module.exports = Router