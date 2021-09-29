const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const jwtMiddleware = require('./src/middleware/jwtMiddleware');

dotenv.config();

const users = require('./src/routes/users');

const app = express();
app.set('port', process.env.PORT || 5000);

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(jwtMiddleware);


/*//req.body 검증용
app.use((req,res,next)=>{
  console.log("req.cookies: ");
	console.log(req.cookies);
  console.log("req.body: ");
	console.log(req.body);
	next();
});
*/


/*//개발환경일때 몽구스 쿼리 표시
if(process.env.NODE_ENV !== 'production'){
  mongoose.set('debug', true); 
}
*/

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('DB 연결 성공'))
  .catch(e => console.log('MongoDB error: ', e));

//const groups = require('./src/routes/groups');
  
app.use('/users', users);
//app.use('/groups', groups);

/*
app.use((req,res,next)=>{
  const error = new Error('test');
  error.status = 403;
  next(error);
});
*/

app.use((err, req, res, next)=>{
  res.status(err.status||500)
    .json({"errorMessage": (err.message||"알 수 없는 오류입나다")});
});

app.listen(app.get('port'), ()=>{
  console.log(app.get('port'), '번 포트 서버 구동중');
})