const {DataTypes} = require('sequelize');
const connection = require('../core/model');
const Users = require('./Users');



const Branch =  connection.define('branch',{
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
Users.associate = models=>{
    Users.hasMany(models.Branch,
        {foreignKey:'userId'});
}


module.exports = Branch