const { Router } = require("express");
const { User } = require('../db');
const bcrypt = require('bcryptjs');
const { check , validationResult } = require('express-validator');
const moment = require('moment');
const jwt = require('jwt-simple');
const { Op } = require('sequelize')

const router = Router();

router.post('/register', [
  check('username','El username es obligatorio').not().isEmpty(),
  check('password','El password es obligatorio').not().isEmpty(),
  check('email', 'El email es obligatorio').isEmail()
] ,async (req,res,next)=>{

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).json({errores:errors.array()})
  }
  const {username,email} = req.body;
  const userExist = await User.findOne({where:{
    [Op.or]: [{email},{username}]
  }});
  if(userExist) {
    return res.status(409).json('Usuario/Email existente')
  }
  else{
    req.body.password = bcrypt.hashSync(req.body.password,5);
    const user = await User.create(req.body);
    res.json(user)
  }
})

router.post('/login', async (req,res,next)=>{
const user = await User.findOne({where: {username:req.body.username}});
  if(user){
    const iguales = bcrypt.compareSync(req.body.password, user.password);
    const id = user.id
    if(iguales){
      res.json({token:createToken(user),id})

    }else {
      res.json({error: "Error en contraseña"})
    }
  }else {
    res.json({error: "Error en usuario y/o contraseña"})
  }
})

const createToken = (user) => {
  const payload = {
    usuarioId: user.id,
    createdAt: moment().unix(),
    expiredAt: moment().add(5,'minutes').unix()
  }
  return jwt.encode(payload, 'secret');
}

module.exports = router;