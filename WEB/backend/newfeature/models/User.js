var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
        
    username: {type: String, required: true},
    name:{
        first: { type : String, required: true},
        last : {type: String, required: true}
    }
}, {timestamps: true});

var User = mongoose.model('user', UserSchema); //user라는 컬렉션을 만든다 -> mongoose
module.exports = {User};