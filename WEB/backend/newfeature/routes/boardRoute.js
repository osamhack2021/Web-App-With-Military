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

/*
GET : http://localhost:3000/user/:userId 으로 UserId(objectId)를 통해 개인이 쓴 글을 불러와 
개인의 게시판에 활용할 수 있다.
*/

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
/*
POST : http://localhost:3000/user/:userId 으로 
개인의 게시판에 글을 작성할 수 있다. 
Body(JSON)으로 
{ 
    "title" : " 오늘 한 일",
    "content" : "영어단어 30개, 책 읽기 p.32-48 ",
    "userId" : "(objectId)"
} 과 같다.
개인의 게시판에 활용할 수 있다.
*/

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
/* 
제목을 게시글을 찾을 수 있다. 그러나 Group에서 작성한 게시글은 찾을 수 없다.
Body(JSON)으로 
{ 
    "title" : " 오늘 한 일"
}
*/

module.exports = {boardRouter};
