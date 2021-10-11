var {Schema, model, Types} = require("mongoose");

var groupBoardSchema = new Schema(
    {
        title : {type : String, required : true}, //제목 
        content : {type: String, required: true}, //내용
        user : {type : Types.ObjectId , required: true, ref: 'User'}, //user데이터
        group : {type : Types.ObjectId , required: true, ref: 'group'} //group 데이터
    },
    {timestamps: true}
);

var groupBoard = model('groupboard',groupBoardSchema);
module.exports = {groupBoard};