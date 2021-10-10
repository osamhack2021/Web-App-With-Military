var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({

    content: {type: String, required:true},
    user: { type: Schema.Types.ObjectId, required:true, ref: "user"},

}, {timestamps:true });

var Comment = mongoose.model('comment', CommentSchema);
module.exports = {Comment};