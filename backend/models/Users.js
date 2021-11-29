const {DataTypes} = require('sequelize');
const connection = require('../core/model');


const Users = new connection.define('users',{
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
    },
    branch_id:{
        type:DataTypes.INTEGER
    }
},{
    freezeTableName:true,
    timestamps:false
});

module.exports = Users;