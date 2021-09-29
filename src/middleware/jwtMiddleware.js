const jwt = require('jsonwebtoken');

const jwtMiddleWare = (req, res, next)=>{
  const token = req.cookies.access_token;
  console.log('token:', token);
  if(!token)next();
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    //res.locals에 토큰 정보 넣기
    res.locals.user={
      _id: decoded._id,
      userName: decoded.userName
    };
    next();
  }catch(e){
    next();
  }
}

module.exports = jwtMiddleWare;