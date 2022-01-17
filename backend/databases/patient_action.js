const {QueryTypes} = require('sequelize')
const sequelize = require('../core/model')

class Patient_action{
    async createTablePatient(id){
        try{
            await sequelize.query(`CREATE TABLE IF NOT EXISTS patient_${id} (patient_id INT NOT NULL AUTO_INCREMENT,
                        fio TEXT NOT NULL,birthday DATE NOT NULL,
       date_added DATE NOT NULL,service_id INTEGER NOT NULL,PRIMARY KEY(patient_id))`)
                .catch(error=>{
                    return {
                        message:error,
                        status:500
                    }
                })
        }catch (e){
            return {
                message:e,
                status:500
            }
        }
    }

    async checkTable(id){
        try{
            const data = await sequelize.query(`SELECT table_name,table_type,engine 
                        FROM information_schema.tables 
                        WHERE table_schema='${process.env.DB}' AND table_name='patient_${id}'`,{type:QueryTypes.SELECT})
            if(!data.length){
                return {
                    length:false
                }
            }else {
                return {
                    length:true
                }
            }

        }catch(e){
            console.log(e)
        }
    }

    async selectPatient(id){
        try{
            const data = sequelize.query(`SELECT * FROM patient_${id}`,{type:QueryTypes.SELECT})
            return data
        }catch (e){
            return e
        }
    }

    async updatePatientService(id,service_id){
        try{
           const data = await sequelize.query(`UPDATE service_${id} SET 
                 service_left = service_left - 1 WHERE service_id = '${service_id}'`,{type:QueryTypes.UPDATE})
            return data
        }catch (e) {
            return e
        }
    }


    async addPatient(fio,birthday,service_id,id){
        try{
            const data = sequelize.query(`INSERT INTO patient_${id} (patient_id,fio,birthday,date_added,service_id) 
                        VALUES (NULL,'${fio}','${birthday}',NOW(),'${service_id}')`,{type:QueryTypes.INSERT})
            if(data){
                await this.updatePatientService(id,service_id)
                return {
                    message:'Пациент успешно добавлен!'
                }
            }
        }catch (e){
            return e
        }
    }

    async deletePatient(id,patient_id){
        try{
            await sequelize.query(`DELETE FROM patient_${id} WHERE patient_id = ${patient_id}`,{type:QueryTypes.DELETE})
        }catch (e) {
            return e
        }finally {
            return {
                message:'Пациент удален!',
                code:200
            }
        }
    }
    async dropTable(id){
        try{
            await sequelize.query(`DROP TABLE patient_${id}`)
        }catch (e){
            return {
                message:e,
                code:500
            }
        }
    }
}


module.exports = new Patient_action()