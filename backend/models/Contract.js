const {DataTypes} = require('sequelize');
const connection = require('../core/model');


const Contract = connection.define('contract',{
    contract_id:{
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
        type:DataTypes.INTEGER
    },
    date:{
        type:DataTypes.DATE,
        allowNull:false
    },
    sum:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    ended:{
        type:DataTypes.DATE,
        allowNull:false
    },
    rendering:{
        type:DataTypes.DATE,
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
    }
},{
    freezeTableName:true,
    timestamps:false
})

module.exports = Contract

