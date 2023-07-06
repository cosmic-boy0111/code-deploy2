const express = require('express');

const Router = express.Router();

const PrepareQuiz = require('../../model/Quiz/PrepareQuiz')
const QuizResponses = require('../../model/Quiz/QuizResponses')

const Multer = require('../FileUploder/multer')
const Uploader = require('../FileUploder/Uploader')

const jwt = require("jsonwebtoken");
const { response } = require('express');

Router.get('/prepareQuiz/:id', async (req, res) => {

    try {
        const newQuiz = await PrepareQuiz({
            userId: req.params['id'],
        });
        newQuiz.save();
        const newResponse = await QuizResponses({
            quizId: newQuiz._id,
            userId: req.params['id']
        })
        newResponse.save();
        res.status(200).send(newQuiz);
        
    } catch (error) {
        console.log(error);
    }

})

Router.post('/changeView', async (req, res)=>{
    try {
        const { userId, quizId, view } = req.body;
        const Quiz = await PrepareQuiz.findOne({
            _id: quizId,
            userId : userId
        })

        const change = await Quiz.changeView(view);

        res.status(200).send({
            message: 'Quiz changed successfully'
        })

    } catch (error) {
        
    }
})

Router.post('/getView', async (req, res)=>{
    try {
        const { userId, quizId} = req.body;
        const Quiz = await PrepareQuiz.findOne({
            _id: quizId,
            userId : userId
        })

        res.status(200).send({
            view : Quiz.AcceptResponse
        })

    } catch (error) {
        
    }
})

Router.get('/quiz/delete/:id', async (req,res)=>{
    try {

        const quiz = await PrepareQuiz.findOne({
            _id : req.params.id
        });

        quiz.fields.forEach( async (element) => {
            await Uploader.DeleteFile( element.question_img , 'image')
        });

        const data = await PrepareQuiz.deleteOne({
            _id : req.params.id
        })
        const delete_response = await QuizResponses.deleteOne({
            quizId : req.params.id
        })
        res.status(200).send(data);
    } catch (error) {
        
    }
})

Router.get('/getAllQuiz/:id', async (req, res) => {
    try {
        

        const data = await PrepareQuiz.find({
            userId : req.params['id']
        });

        console.log(data);

        res.status(200).send(data);
    } catch (error) {
        
    }
})

Router.post('/fields', async (req, res) => {
    try {
        
        const { userId, quizId } = req.body;
        console.log(userId, quizId);
        const Quiz = await PrepareQuiz.findOne({
            _id: quizId,
            userId : userId
        })

        console.log(Quiz);

        res.status(200).send(Quiz.fields);

    } catch (error) {
        console.log(error);
    }
})


Router.post('/deleteFieldFile', async (req, res)=>{
    try {
        const {type, index, userId, quizId, pre_img} = req.body;
        console.log(type);

        const Quiz = await PrepareQuiz.findOne({
            _id: quizId,
            userId : userId
        })

        await Uploader.DeleteFile(pre_img, type)

        const upd = await Quiz.updateFiledImg(index, '');

        res.status(200).send({
            message : 'Quiz updated successfully'
         });

    } catch (error) {
        
    }
} )


Router.post('/uploadFieldFile', Multer.single('file'), async (req, res) => {
    try {
        const {type, index, userId, quizId, pre_img} = req.body;

        

        var fileUrl = ''
        await Uploader.UploadFile(req.file.path,type).then((res)=>{
            fileUrl = res;
        })

        const Quiz = await PrepareQuiz.findOne({
            _id: quizId,
            userId : userId
        })
        
        console.log(fileUrl);
        console.log(Quiz);

        if(pre_img !== ''){
            await Uploader.DeleteFile(pre_img, type)
        }


        const upd = await Quiz.updateFiledImg(index, fileUrl);

        res.status(200).send({
            message : 'Quiz updated successfully'
         });


    } catch (error) {
        
    }
})

Router.post('/headerData', async (req, res) => {
    try {
        
        const { userId, quizId } = req.body;
        const Quiz = await PrepareQuiz.findOne({
            _id: quizId,
            userId : userId
        })


        res.status(200).send({
            title : Quiz.title,
            description : Quiz.description
        });

    } catch (error) {
        console.log(error);
    }
})


Router.post('/updateTitDes', async (req, res) => {
    try {
        const { userId, quizId, title, description } = req.body;
        const Quiz = await PrepareQuiz.findOne({
            _id: quizId,
            userId : userId
        })

        const upd = await Quiz.updateTitDec(title, description);

        res.status(200).send({
            message : 'Quiz updated successfully'
         });

    } catch (error) {
        
    }
})

Router.post('/addField', async (req, res) => {
    try {
        console.log('under add router');
        const { 
            userId, 
            quizId,
            index,
            data
         } = req.body;

         const Quiz = await PrepareQuiz.findOne({
            _id: quizId,
            userId : userId
         });

        const add = await Quiz.addField(data,index);

        Quiz.save();

        res.status(200).send(add)

    } catch (error) {
        console.log(error);
    }
})


Router.post('/updateField', async (req, res) => {
    try {
        console.log("under update req");
        const { 
            userId, 
            quizId,
            index,
            data
        } = req.body;

        const Quiz = await PrepareQuiz.findOne({
            _id: quizId,
            userId : userId
         });

        const add = await Quiz.updateField(data,index);

        Quiz.save();

        res.status(200).send(add)

    } catch (error) {
        console.log(error);
    }
})

Router.post('/deleteField', async (req, res) => {
    try {

        console.log("under delete req");

        const { 
            userId, 
            quizId,
            data
        } = req.body;

        const Quiz = await PrepareQuiz.findOne({
            _id: quizId,
            userId : userId
         });

        const deleted = await Quiz.deleteField(data);

         console.log(Quiz);

        //  Quiz.save();

         res.status(200).send({
            message : 'Quiz deleted successfully'
         });

    } catch (error) {
        
    }
})

Router.post('/reorderList', async (req, res) => {
    try {
        const { 
            userId, 
            quizId,
            startIndex, 
            endIndex,
        } = req.body;

        const Quiz = await PrepareQuiz.findOne({
            _id: quizId,
            userId : userId
         });

         const re = await Quiz.reorderFields(startIndex, endIndex);

         res.status(200).send({
            message : 'Quiz reorder successfully'
         });


    } catch (error) {
        console.log(error);
    }
})

module.exports = Router;