const {DataTypes} = require('sequelize');
const connection = require('../core/model');



const Branch = new connection.define('branch',{
    branch_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    description:{
        type:DataTypes.TEXT,
        allowNull: false
    }
},{
    freezeTableName:true,
    timestamps:false
});

module.exports = Branch