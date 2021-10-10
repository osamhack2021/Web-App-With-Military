var express = require("express");
var userRouter = express.Router();
var bodyParser = require("body-parser");

//Schema 연결하기
var {User} = require("../models/User");


userRouter.get("/", async(req,res) => {

    try{

        const users = await User.find({});
        return res.send({ users });

    }catch(err){

        console.log(err);
        return res.status(500).send({err: err.mesaage})

    }

})

userRouter.post('/',  async(req,res) => {

    try{
        let {username, name} =req.body;
        if(!username) return res.status(400).send({err: "username is required"});
        if(!name || !name.first || !name.last) return res.status(400).send({err: "Both first and last names are required"});
       
        var user = new User(req.body);
        await user.save();
        return res.send({user})

    }catch(err){

        console.log(err);
        return res.status(500).send({err: err.mesaage})
    }
    
})




module.exports = {userRouter};