var express = require("express");
var groupBoardRouter = express.Router();
var { isValidObjectId } =require("mongoose");
var bodyParser = require("body-parser");

//Schema 연결
var {Board} = require("../models/board");
var {User} = require("../models/User");
var {Group} = require("../models/group");
var {Comment} = require("../models/Comment");
var {groupBoard} = require("../models/groupBoard");


// 그룹 내 게시글 조회
groupBoardRouter.get('/:groupId', async(req, res) => {

    const {groupId} =req.params;
    try{
        const board = await groupBoard.find({group : groupId});
        return res.send({board});
    }catch(err){
        console.log(err);
        return res.status(500).send({err: err.message})
    }

})
/* 
GET : http://localhost:3000/groupBoard/:groupId(그룹을 구별하기 위함)를 통해 그룹 내 게시글을 모두 불러올 수 있다.
- groupBoards 에 들어있는 db 중 groupId(고유값)을 통해 게시글을 모두 불러옴
*/

// 그룹 내 게시글 작성(db: groupBoard에 저장)
groupBoardRouter.post('/:groupId', async(req,res) => {

    try{
        const{ title, content, userId, groupId} = req.body;
        if(typeof title !== 'string') res.status(400).send({err : "title is requierd"});
        if(typeof content !== 'string') res.status(400).send({err : "content is requierd"});
        if(!isValidObjectId(groupId)) 
         res.status(400).send({err : "groupId is invaild"});
        let group = await Group.findOne({_id:groupId}); 
        if(!group) res.status(400).send({err : " groupId does not exist"});
        let user = await User.findOne({_id:userId}); 
        if(!user) res.status(400).send({err : " userId does not exist"});

        let groupboard = new groupBoard({ ...req.body, group, user});
        await groupboard.save();
        return res.send({ groupboard });

    }catch(err){
        console.log(err);
        res.status(500).send({err: err.message});
    }

})
/*
POST : http://localhost:3000/groupBoard/:groupId 를 통해 그룹 내 게시글을 작성할 수 있다. 
Body(JSON)으로 
{
    "title" : "그룹 참가자 유의사항",
    "content" : "1. 주간 계획표 작성하기, 2.출석 후 게시글 작성", 
    "userId" : "(objectId)", //작성한 유저를 구분하기 위함.
    "groupId" : "(objectId)" //그룹 별 게시글을 구분하기 위함.
}

*/


//게시판 글 검색
groupBoardRouter.get('/search/:title_search', async(req,res) => {

    const {title_search} =req.params;
    try{
        if(typeof title_search !== 'string') res.status(400).send({err : "put the title"});
        const title = await groupBoard.find({title: title_search});
        return res.send({title});
    }catch(err){
        console.log(err);
        res.status(500).send({err: err.message});
    }
})
/*
GET : http://localhost:3000/groupBoard/search/:title_search 을 통해 
제목을 통해 그룹내 게시글 검색기능  
*/


module.exports = {groupBoardRouter};
