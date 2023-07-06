const mongoose = require('mongoose');

const webGraph = new mongoose.Schema({
    users : {
        type : Array,
        default : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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


const WebGraph = mongoose.model('WebGraph', webGraph);
module.exports = WebGraph;