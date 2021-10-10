var express = require("express");
var boardRouter = express.Router();
var { isValidObjectId } =require("mongoose");
var bodyParser = require("body-parser");

//Schema 연결
var {Board} = require("../models/board");
var {User} = require("../models/User");

//User(개인)의 게시판 불러오기(조회)
boardRouter.get('/:userId', async(req,res) => {

    const {userId} =req.params;
    try{
        const board = await Board.find({user: userId});
        return res.send({board});
    }catch(err){
        console.log(err);
        return res.status(500).send({err: err.message})
    }
    
})

//게시판 작성
boardRouter.post('/:userId', async(req,res) => {
    
    try{
        const{ title, content, userId} = req.body;
        if(typeof title !== 'string') res.status(400).send({err : "title is requierd"});
        if(typeof content !== 'string') res.status(400).send({err : "content is requierd"});
        if(!isValidObjectId(userId)) 
         res.status(400).send({err : "userId is invaild"});
        let user = await User.findOne({_id:userId}); 
        if(!user) res.status(400).send({err : "userId does not exist"});

        let board = new Board({ ...req.body, user});
        await board.save();
        return res.send({ board });

    }catch(err){
        console.log(err);
        res.status(500).send({err: err.message});
    }
    
})

//게시판 글 검색
boardRouter.get('/search/:title', async(req,res) => {

    const {title_search} =req.body;
    try{
        if(typeof title_search !== 'string') res.status(400).send({err : "put the title"});
        const title = await Board.find({title: title_search});
        return res.send({title});
    }catch(err){
        console.log(err);
        res.status(500).send({err: err.message});
    }


})

module.exports = {boardRouter};