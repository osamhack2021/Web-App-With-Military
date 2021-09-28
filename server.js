const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
app.set('port', process.env.PORT || 5000);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

/* req.body 검증용
app.use((req,res,next)=>{
	console.log(req.body);
	next();
});
*/

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('DB 연결 성공'))
  .catch(e => console.log('MongoDB error: ', e));


app.listen(app.get('port'), ()=>{
  console.log(app.get('port'), '번 포트 서버 구동중');
})

