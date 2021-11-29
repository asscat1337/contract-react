const {DataTypes} = require('sequelize');
const connection = require('../core/model');



const Roles = new connection.define('roles',{
    roles_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    description:{
        type:DataTypes.STRING,
        allowNull: false
    }
},{
    freezeTableName:true,
    timestamps:false
});


module.exports = Roles