const checkLoggedin = (req, res, next)=>{
  if(!res.locals.idLoggedin){
    const error = new Error(`로그인 후 이용하실 수 있습니다`);
    error.status=401;
    return next(error);
  }
  next();
}

module.exports = checkLoggedin;