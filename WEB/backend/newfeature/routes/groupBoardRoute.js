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


//게시판 글 검색
groupBoardRouter.get('/search/:title', async(req,res) => {

    const {title_search} =req.body;
    try{
        if(typeof title_search !== 'string') res.status(400).send({err : "put the title"});
        const title = await groupBoard.find({title: title_search});
        return res.send({title});
    }catch(err){
        console.log(err);
        res.status(500).send({err: err.message});
    }
})

module.exports = {groupBoardRouter};