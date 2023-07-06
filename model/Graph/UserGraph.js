const mongoose = require('mongoose');


const userGraph = new mongoose.Schema({
    userId : {
        type : String
    },
    blogs : {
        type : Array,
        default : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    problems : {
        type : Array,
        default : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    courses : {
        type : Array,
        default : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
})

const UserGraph = mongoose.model("UsersGraph", userGraph);

module.exports = UserGraph

