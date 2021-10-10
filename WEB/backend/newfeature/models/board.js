var {Schema, model, Types} = require("mongoose");

var BoardSchema = new Schema(
    {
        title : {type : String, required : true}, //제목 
        content : {type: String, required: true}, //내용
        user : {type : Types.ObjectId , required: true, ref: 'User'}
    },
    {timestamps: true}
);

var Board = model('board',BoardSchema);
module.exports = {Board};