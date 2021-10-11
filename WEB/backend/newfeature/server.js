var express = require("express");
var mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
var dotenv = require("dotenv");


mongoose.connect("mongodb://localhost:27017/main3");

var app = express();
app.use(express.json());  //req.body 사용할 때 
app.use(express.urlencoded({extends: true}));
app.use(cookieParser());


// Schema 연결
var { User } = require("./models/User");
var { Board} = require("./models/board");
var { group } = require("./models/group");


// Router 연결
var {boardRouter}  = require("./routes/boardRoute");
var {userRouter} = require("./routes/userRoute");
var {commentRouter} = require("./routes/commentRoute");
var {groupRouter} = require("./routes/groupRoute");
var {groupBoardRouter} = require('./routes/groupBoardRoute');
var {groupCommentRouter} = require('./routes/groupComment');


app.use("/board", boardRouter); 
app.use("/user", userRouter);
app.use("/board/:boardId/comment", commentRouter);
app.use("/group", groupRouter);
app.use("/groupBoard" , groupBoardRouter);
app.use("/groupBoard/:groupId/comment" , groupCommentRouter);

app.listen(3000, () => {

    try{
        console.log("server conneted");
    }catch(err)
    {
        console.log("disconneted");
    }
});




