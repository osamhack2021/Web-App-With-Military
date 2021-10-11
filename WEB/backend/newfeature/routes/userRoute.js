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

/*
GET : http://localhost:3000/user 를 통해 모든 user을 불러올 수 있다.
*/

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
/*
POST : http://localhost:3000/user 를 통해 user을 db에 넣을 수 있다.
Body(JSON)으로 
{
    "username" : "June", 
    "name" : 
    {
        "first" : "jun",
        "last" : "IM"
    }
}
*/



module.exports = {userRouter};
