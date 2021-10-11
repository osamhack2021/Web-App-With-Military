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


module.exports = {groupRouter};