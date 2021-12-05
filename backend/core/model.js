const {Sequelize} = require('sequelize');
const {DB,DB_PASSWORD,DB_USER,DB_HOST} = process.env;


const connection = new Sequelize(DB,DB_USER,DB_PASSWORD,{
    host:DB_HOST,
    dialect:'mysql'
});

async function init(){
    try{
        await connection.authenticate();
        await connection.sync({alter:true})
        console.log(`Connected to ${DB}`)
    }catch (e) {
        console.log(e)
    }
}

init();

module.exports = connection