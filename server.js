const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const jwtMiddleware = require('./src/middleware/jwtMiddleware');

dotenv.config();

const users = require('./src/routes/users');
const groups = require('./src/routes/groups');
const ranks = require('./src/routes/ranks');
const studying = require('./src/routes/studying');

const app = express();
app.set('port', process.env.PORT || 5000);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(jwtMiddleware);

/* //req.body 검증용
app.use((req,res,next)=>{
  console.log("req.cookies: ");
	console.log(req.cookies);
  console.log("req.body: ");
	console.log(req.body);
	next();
});
*/

// 개발환경일때 몽구스 쿼리 표시
if (process.env.NODE_ENV !== 'production') {
  mongoose.set('debug', true);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('DB 연결 성공'))
  .catch(e => console.log('MongoDB error: ', e));

app.use('/users', users);
app.use('/groups', groups);
app.use('/ranks', ranks);
app.use('/studying', studying);

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
  res.status(err.status).json(err.body);
  next();
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트 서버 구동중');
});
