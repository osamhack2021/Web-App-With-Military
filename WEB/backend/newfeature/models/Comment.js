var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({

    content: {type: String, required:true},
    user: { type: Schema.Types.ObjectId, required:true, ref: "user"},
    board : { type: Schema.Types.ObjectId, required:true, ref: "Board"}

}, {timestamps:true });

var Comment = mongoose.model('comment', CommentSchema);
module.exports = {Comment};
