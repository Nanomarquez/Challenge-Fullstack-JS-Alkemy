const checkToken = (req,res,next) =>{
const jwt = require('jwt-simple');
const moment = require('moment');

  if(!req.headers['user-token']){
    return res.json({error: 'Necesitas incluir el user-token en headers'})
  }
  const userToken = req.headers['user-token'];
  let payload ={};
  try {
    payload = jwt.decode(userToken,'secret')
  } catch (error) {
    return res.json({error: 'El token es incorrecto'})
  }
  if(payload.expiredAt < moment().unix()){
    return res.json({error: 'El token ah expirado'})
  }
  req.usuarioId = payload.usuarioId
  next()
}

module.exports ={
  checkToken: checkToken
}