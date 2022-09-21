require('dotenv').config(); //Permite usar variables de entorno
const { Sequelize } = require('sequelize');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME
} = process.env;
const modelBalance = require('./models/Balance');
const modelUser = require('./models/User');

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

modelBalance(sequelize);
modelUser(sequelize);

const { Balance , User } = sequelize.models;

User.hasMany(Balance)
Balance.belongsTo(User)

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};