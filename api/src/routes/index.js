const { Router } = require('express');
const {checkToken} = require('./middlewares');
const balanceRouter = require('./balances');
const userRouter = require('./user');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/balances',balanceRouter);
router.use('/users',userRouter);

router.get('/', (req, res) => { 
    res.send('Bienvenido a mi API =)')
})


module.exports = router;