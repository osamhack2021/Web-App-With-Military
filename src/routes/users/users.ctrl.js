const User = require('../../models/USER');

/*
  토큰 검증시
  GET /users/check

  회원가입시
  POST /users/register
  {
    email: 'withmillitart@gmail.com'
    password: '1q2w3e4r!'
    userName: '윤장한'
  }

  로그인시
  POST /users/login
  {
    email: 'withmillitart@gmail.com'
    password: '1q2w3e4r!'
  }
*/

//  토큰 검증
const check = async (req, res, next)=>{
  const user_id = res.locals._id;
  if(!user_id){
    //  로그인 중 아님
    const error = new Error(`로그인 중이 아닙니다`);
    error.body={
      'loginFailure': 'email'
    }
    error.status=401;
    next(error);
  }
  //  id로 user문서 반환
  const user = await User.findById(user_id);
  res.json({'user': user.serialize()});
};

//회원가입 처리
const register = async (req, res, next)=>{
  const {email, password, userName} = req.body;
  try{
    //email 존재유무 확인
    const exist = await User.findByEmail(email);
    console.log(exist);
    if(exist){
      const error = new Error(`${email}은 이미 사용중인 이메일입니다`);
      error.body={
        'loginFailure': 'passwoed'
      }
      error.status=409;
      return next(error);
    }
    const user = new User({email, userName});
    await user.setPassword(password); //암호화된 비밀번호 설정
    await user.save(function(err) {
      if(err) {
          console.log(err);
      }});//데이터베이스 저장
    
    //토큰 발급
    const token = user.generateToken();
    res.cookie('access_token', token, {
      maxAge: 1000*60*20,
      httpOnly: true,
    });
    
    res.json({'user': user.serialize()});

  }catch(error){
    error.status=500;
    return next(error);
  }
};

//로그인 처리
const login = async (req, res, next)=>{
  const {email, password} = req.body;

  if(!email || !password){
    const error = new Error(`로그인 폼 오류`);
    error.status=401;
    next(error);
  }

  try{
    const user = await User.findByEmail(email);
    if(!user){
      const error = new Error(`존재하지 않는 아이디입니다`);
      error.status=401;
      return next(error);
    }
    const valid = await user.comparePassword(password);
    //console.log(valid);
    if(!valid){
      console.log(`비밀번호가 일치하지 않습니다`)
      const error = new Error(`비밀번호가 일치하지 않습니다`);
      error.status=401;
      return  next(error);
    }
    
    //토큰 발급
    const token = user.generateToken();
    res.cookie('access_token', token, {
      maxAge: 1000*60*20,
      httpOnly: true,
    });
    //console.log(user.serialize());
    res.json({'user': user.serialize()});

  }catch(error){
    error.status=500;
    return next(error);
  }
};

//로그아웃 처리
const logout = async (req, res, next)=>{
  res.cookie('access_token');
  res.status(204);
  next();
}


module.exports = {register, login, check, logout};
