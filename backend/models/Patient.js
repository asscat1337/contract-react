const {DataTypes} = require('sequelize');
const connection = require('../core/model');



const Patient = connection.define('patient',{
    patient_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    fio:{
        type:DataTypes.STRING,
        allowNull: false
    },
    birthday:{
        type:DataTypes.DATE,
        allowNull:false
    },
    date_added:{
        type:DataTypes.DATE,
        allowNull:false
    },
    service_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    freezeTableName:true,
    timestamps:false
});


module.exports = Patient;