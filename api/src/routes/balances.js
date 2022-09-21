const { Router } = require("express");
const { Balance,User } = require('../db');

const router = Router();

router.get('/',async (req,res,next) =>{
  const {UserId} = req.query;
  try {
    const balanceList = [];
    const balanceDB = await Balance.findAll({where: {UserId}});
    for(var i = 0; i < balanceDB.length; i++){
      const record = balanceDB[i].dataValues;
      balanceList.push({
        id: record.id,
        detail: record.detail,
        amount: record.amount,
        category: record.category,
        isIncome: record.isIncome,
        date: record.date
      })
    }
    res.json(balanceList)
  } catch (error) {
    next(error)
  }
})

router.post('/',async (req,res,next)=>{
  const { detail, amount ,category, isIncome,UserId } = req.body;
  var date = new Date()
  try {
    const newRecord = await Balance.create({
      detail,
      amount,
      category,
      isIncome,
      date,
      UserId
    })
    const user = await User.findOne({where: {id:UserId}});
    user.addBalances(newRecord)
    res.status(201).json(newRecord);
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req,res,next)=>{                                                    
  const { id } = req.params;
    try {
      const recordDB = await Balance.findOne({where: {id}});
      if(recordDB){
        const record = recordDB.dataValues;
        const recordFound = {
          id: record.id,
          detail: record.detail,
          amount: record.amount,
          category: record.category,
          isIncome: record.isIncome
        }
        res.status(200).json(recordFound)
      }
      else {
        res.status(404).json('Record not Found')
      }
    } catch (error) {
      next(error)
    }
})

router.delete('/',async (req,res,next)=>{
  const {id} = req.query;
  try {
    const record = await Balance.findOne({where: {id}});
    if(record){
      await record.destroy();
      res.status(200).json('Record eliminado')
    }else{
      res.status(404).json('Record no encontrado')
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req,res,next)=>{
  const { id } = req.params;
  try {
    const findRecord = await Balance.findOne({where: {id}});
    if(findRecord){
      await findRecord.update(req.body);
      res.json('Record modificado')
    }else{
      res.json('Record no encontrado')
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router;