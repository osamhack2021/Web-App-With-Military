var express = require("express");
var groupRouter = express.Router();
var { isValidObjectId } =require("mongoose");
var bodyParser = require("body-parser");

//Schema 연결
var {Board} = require("../models/board");
var {User} = require("../models/User");
var {Group} = require("../models/group");
var {Comment} = require("../models/Comment");
var {groupBoard} = require("../models/groupBoard");

//그룹 모두 불러오기
groupRouter.get('/', async(req,res) => {

    try{
        const group = await Group.find({});
        return res.send({group});
    }catch(err){
        console.log(err);
        return res.status(500).send({err: err.message})
    }
    
})

/*
GET : localhost:3000/group을 통해 모든 group을 불러올 수 있다.
그룹명은 필수 값이며 그 외의 것은 ./models/group을 통해 확인할 수 있다. 
*/

*/

// 그룹 만들기 
groupRouter.post('/', async(req,res) => {
    
    try{
        const{ name } = req.body;
        if(typeof name !== 'string') res.status(400).send({err : "name is requierd"});

        let group = new Group({ ...req.body, Group});
        await group.save();
        return res.send({ group });

    }catch(err){
        console.log(err);
        res.status(500).send({err: err.message});
    }
    
})
/*
POST : localhost:3000/group을 통해 그룹을 추가할 수 있다.
Body(JSON)으로
{
    "name" : "abdStudy"
} 으로 그룹을 추가할 수 있다.
*/

module.exports = {groupRouter};
