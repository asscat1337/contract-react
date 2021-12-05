const {DataTypes} = require('sequelize');
const connection = require('../core/model');
const Users = require('./Users');



const Roles = connection.define('roles',{
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

Users.associate = models=>{
    Users.hasMany(models.Roles,{
        foreignKey:'userId'
    });
}

module.exports = Roles