const mongoose = require('mongoose');


const quizResponse = new mongoose.Schema({

    quizId : {
        type : String
    },

    userId : {
        type : String
    },

    responses : {
        type : Array,
        default : []
    }

})

quizResponse.methods.addResponse = async function(data){
    try {
        
        this.responses.push(data);
        this.save();

        return this.responses;

    } catch (error) {
        console.log(error);
    }
}

const QuizResponse = mongoose.model('QuizResponse',quizResponse);

module.exports = QuizResponse;