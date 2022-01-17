const {DataTypes} = require('sequelize');
const connection = require('../core/model');


const Type = connection.define('type',{
    type_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    title:{
        type:DataTypes.TEXT,
        allowNull:false
    }
},{
    freezeTableName:true,
    timestamps:false
})

module.exports = Type;