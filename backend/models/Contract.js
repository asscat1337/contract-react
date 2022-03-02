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
        type:DataTypes.DECIMAL(10,2),
        allowNull:false
    },
    sum_left:{
        type:DataTypes.DECIMAL(10,2),
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
    date_service:{
        type:DataTypes.DATEONLY,
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
    },
    notice:{
        type:DataTypes.TEXT,
    },
    isProlongation:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }
},{
    freezeTableName:true,
    timestamps:false
});

module.exports = Contract;

