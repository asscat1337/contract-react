const {DataTypes} = require('sequelize');
const connection = require('../core/model');


const Contract = connection.define('contract',{
    contract_id:{
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
        type:DataTypes.INTEGER
    },
    number_contract:{
        type:DataTypes.TEXT
    },
    date:{
        type:DataTypes.DATEONLY,
        allowNull:false
    },
    sum:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    sum_left:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    ended:{
        type:DataTypes.DATEONLY,
        allowNull:false
    },
    rendering:{
        type:DataTypes.DATEONLY,
        allowNull:false
    },
    description:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    branch:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    organization:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    type:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    link:{
        type:DataTypes.BLOB("long")
    },
    filename:{
        type:DataTypes.TEXT
    }
},{
    freezeTableName:true,
    timestamps:false
});

module.exports = Contract;

