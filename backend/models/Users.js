const {DataTypes} = require('sequelize');
const connection = require('../core/model');
const Roles = require('./Roles');
const Branch = require('./Branch');


const Users = connection.define('users',{
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
    },
    login:{
        type:DataTypes.TEXT,
        allowNull: false
    },
    password:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    birthday:{
        type:DataTypes.DATE,
        allowNull:false
    },
    fio:{
        type:DataTypes.TEXT,
        allowNull:false
    }
},{
    freezeTableName:true,
    timestamps:false
});

Users.belongsTo(Roles)
Users.belongsTo(Branch)

module.exports = Users;