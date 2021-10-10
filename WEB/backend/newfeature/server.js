var express = require("express");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/main");

var app = express();
app.use(express.json());  //req.body 사용할 때 
app.use(express.urlencoded({extends: true}));

// Schema 연결
var { User } = require("../../../feature/models/User");
var { Board} = require("../../../feature/models/board");

// Router 연결
var {boardRouter}  = require("../../../feature/routes/boardRoute");
var {userRouter} = require("../../../feature/routes/userRoute");
var {commentRouter} = require("../../../feature/routes/commentRoute");

app.use("/board", boardRouter);
app.use("/user", userRouter);
app.use("/board/:boardId/comment", commentRouter);

app.listen(3000, () => {

    try{
        console.log("server conneted");
    }catch(err)
    {
        console.log("disconneted");
    }
});




