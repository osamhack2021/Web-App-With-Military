var express = require("express");
var commentRouter = express.Router({mergeParams : true});
var { isValidObjectId } = require("mongoose");
var bodyParser = require("body-parser");

//Schema 
var { Comment} = require("../models/Comment");
var { Board } = require("../models/board");
var { User } = require("../models/User");

/*
    /user
    /board
    /board/:boardId/commnet -> 특정 블로그의 후기(하위개념)
*/


//댓글 작성
commentRouter.post("/", async(req,res) => {

   
    try{
        var { boardId } = req.params;
        var { content, userId } =req.body;
        if(!isValidObjectId(boardId)) 
         res.status(400).send({err : "boardId is invaild"});
        if(!isValidObjectId(userId)) 
         res.status(400).send({err : "userId is invaild"});
        if(typeof content !== 'string') res.status(400).send({err : "content is requierd"});

        var blog = await Board.findByIdAndUpdate(boardId);
        var user = await User.findByIdAndUpdate(userId);
        if(!blog || !user) return res.status(400).send({err: "blog or user does not exist"});
        
        var comment = new Comment({content, user});
        await comment.save();
        return res.send({comment});

    }catch(err){

        return res.status(400).send({ err:message});

    }

});

//댓글 조회
commentRouter.get("/", async(req,res) => {
     
    var { boardId } = req.params;
    if(!isValidObjectId(boardId))
     return res.status(400).send({err: "boradId is invalid"});

    var comments = await Comment.find({ blog : boardId});
    return res.send({comments});

});


module.exports = {commentRouter};