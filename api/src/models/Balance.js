const { DataTypes } = require('sequelize');

module.exports = sequelize =>{
  sequelize.define('Balance', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    detail: {
      type: DataTypes.STRING
    },
    amount:{
      type: DataTypes.INTEGER
    },
    category:{
      type: DataTypes.STRING
    },
    isIncome:{
      type: DataTypes.BOOLEAN
    },
    date:{
      type: DataTypes.DATEONLY
    }
  },{
    timestamps: false,
  })
}