var express = require("express");
var groupCommentRouter = express.Router({mergeParams : true});
var { isValidObjectId } = require("mongoose");
var bodyParser = require("body-parser");

//Schema 
var { Comment} = require("../models/Comment");
var { Board } = require("../models/board");
var { User } = require("../models/User");
var { group } = require("../models/group");
var { groupBoard } = require("../models/groupBoard");

/*
    /user
    /board
    /board/:boardId/commnet -> 특정 블로그의 후기(하위개념)
*/


//댓글 작성
groupCommentRouter.post("/", async(req,res) => {

   
    try{
        var { groupId } = req.params;
        var { content, userId } =req.body;
        if(!isValidObjectId(groupId)) 
         res.status(400).send({err : "groupId is invaild"});
        if(!isValidObjectId(userId)) 
         res.status(400).send({err : "userId is invaild"});
        if(typeof content !== 'string') res.status(400).send({err : "content is requierd"});

        var board = await groupBoard.findByIdAndUpdate(groupId);
        var user = await User.findByIdAndUpdate(userId);
        if(!board || !user) return res.status(400).send({err: "board or user does not exist"});
        
        var comment = new Comment({content, board, user});
        await comment.save();
        return res.send({comment});

    }catch(err){

        return res.status(400).send({ err:message});

    }

});


/* 
POST : http://localhost:3000/groupBoard/:groupId/comment 를 통해 게시판에 댓글을 작성할 수 있다. 
groupId 는 req.params(url)을 통해 받고 
Body(JSON)으로 
{
    "content" : "좋아요",
    "userId" "(objectId)"
} 와 같다.
-> db는 comments에 저장된다. 
*/

//댓글 조회
groupCommentRouter.get("/", async(req,res) => {
     
    var { groupId } = req.params;
    if(!isValidObjectId(groupId))
     return res.status(400).send({err: "groupId is invalid"});

    var comments = await Comment.find({ group : groupId});
    return res.send({comments});

});

/*
GET : http://localhost:3000/board/:boardId/comment 을 통해 comments에 있는 db를 불러와 게시판에 작성된 댓글을 확인할 수 있다.
*/

module.exports = {groupCommentRouter};
