const dotenv = require('dotenv')
const mongoose = require('mongoose')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const myParser = require('body-parser')
const app = express();

dotenv.config({path:'./config.env'});
require('./db/conn');

// app.use(express.json());
app.use(cookieParser());
app.use(myParser.json({limit: '200mb'}));
app.use(myParser.urlencoded({limit: '200mb', extended: true}));
app.use(myParser.text({ limit: '200mb' }));

app.use(require('./router/auth'));
app.use(require('./router/Problems/ProblemsRoutes'));
app.use(require('./router/Problems/ProblemSolutionRoutes'))
app.use(require('./router/UserAction/Followers'))
app.use(require('./router/Blog/Blog'))
app.use(require('./router/Users/userList'))
app.use(require('./router/Images/images'))
app.use(require('./router/Blog/LikeBlogs'))
app.use(require('./router/UserAction/FollowCount'))

app.use(require('./router/Channel/ChangeImg'))
app.use(require('./router/Channel/Channel'))
app.use(require('./router/Channel/CreatePlaylist'))
app.use(require('./router/Channel/Videos'))
app.use(require('./router/Channel/VideoUrl'))
app.use(require('./router/Channel/VideoWatch'))
app.use(require('./router/Channel/Library'))
app.use(require('./router/Channel/CustomizeChannel'))
app.use(require('./router/Channel/CountGetters'))

app.use(require('./router/UserCourses/userCourses'))
app.use(require('./router/UserCourses/userCoursesLibrary'))

app.use(require('./router/Search/Search'))

app.use(require('./router/Graph/Graph'))
app.use(require('./router/Graph/UserGraph'))

app.use(require('./router/Quiz/PrepareQuiz'));
app.use(require('./router/Quiz/QuizForm'));
app.use(require('./router/Quiz/QuizResponses'));

app.use(require('./router/Comment/Comment'))

app.use(require('./router/PreviewCourse/Course'))

app.use(require('./Python/ModelFunction'))


app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_ , res){
    res.sendFile(
        path.join(__dirname, "./client/build/index.html"),
        function (err){
            res.status(500).send(err);
        }
    )
})


const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`server is running at port no ${PORT}`);
})
