const {DataTypes} = require('sequelize');
const connection = require('../core/model');



const generateServices=(id)=>{

   return connection.define(`services_${id}`,{
        services_id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        service_name:{
            type:DataTypes.TEXT,
            allowNull: false
        },
        service_cost:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        service_count:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        agreement_id:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        service_left:{
            type:DataTypes.INTEGER,
            allowNull:false
        }

    },{
        freezeTableName:true,
        timestamps:false
    });


}

module.exports = generateServices