const sequelize = require('../core/model')
const {QueryTypes} = require('sequelize')
const Contract = require('../models/Contract')
const dayjs = require("dayjs");

class Service_action {
    id
    constructor(id) {
        this.id = id
    }
    async createService(id){
        try{
            await sequelize.query(`CREATE TABLE IF NOT EXISTS service_${id} (service_id INT NOT NULL AUTO_INCREMENT,
        service_name TEXT NOT NULL,service_cost INT NOT NULL,service_count INT NOT NULL,date_rendering DATE NOT NULL,
        agreement_id INT NOT NULL,service_left INT NOT NULL,PRIMARY KEY (service_id))`)
                .catch(error=>console.log(error))
        }catch (e){
            return {
                message:e,
                code:500
            }
        }
    }
    async ActionCheckTable(id){
            try{
                const data = await sequelize.query(`SELECT table_name,table_type,engine 
                        FROM information_schema.tables 
                        WHERE table_schema='${process.env.DB}' AND table_name='service_${id}'`,{type:QueryTypes.SELECT})
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
                return {
                    message:e,
                    status:500
                }
            }
        }
        async addService(service_count,service_cost,service_name,date_rendering,id,sum_left){
            try{
              const data = await sequelize.query(`INSERT INTO service_${id} 
                    (service_id,service_name,service_cost,service_count,date_rendering,agreement_id,service_left)
                    VALUES (NULL,'${service_name}','${service_cost}','${service_count}','${date_rendering}','${id}','${service_count}')`,
                   {type:QueryTypes.INSERT})
                if(data){
                    await Contract.update({
                        sum_left:sum_left - service_cost
                    },{where:{
                        contract_id:id
                        }
                    })
                    return {
                        message:'Запись успешно добавлена!',
                        code:200,
                        data:{
                            service_name,service_cost,service_count,
                            agreement_id:id,service_id:data[0],date_rendering,sum_left:sum_left - service_cost
                        }
                    }
                }
            }catch (e) {
                return e
            }
        }
        async showService(id){
            try{
                const data = await sequelize.query(`SELECT * FROM service_${id}`,{type:QueryTypes.SELECT})
                return data
            }catch (e) {
               return {
                   message:e,
                   code:500
               }
            }
        }
        async deleteService(id,service_id,service_cost,service_count){
            try{
                 await sequelize.query(`DELETE FROM service_${id} WHERE service_id=${service_id}`,{type:QueryTypes.DELETE})
                     .then(()=>{
                     })
                   const selectContract = await Contract.findByPk(id)
                    await Contract.update({
                        sum_left:selectContract.sum_left + service_cost
                    },{
                        where:{
                            contract_id:id
                        }
                    })
                    return {
                        message:'Услуга успешно удалена'
                    }

            }catch (e) {
                console.log(e)
                return e
            }
        }

        async dropTable(id){
            try{
                const data = await sequelize.query(`DROP TABLE service_${id}`)
                if(data){
                    return {
                        message:'Таблица успешно удалена!',
                        code:200
                    }
                }
            }catch (e){
                return {
                    message:e,
                    code:500
                }
            }
        }

        async updateService(id,serviceName,serviceCost,serviceCount,service_id,sum_left,prevSumService,date_renderind){
            try{

                const formattedData = dayjs(date_renderind).format('YYYY-MM-DD')

                const checkSum = ()=>{
                    if(prevSumService > serviceCost) {
                        return (prevSumService - serviceCost) + sum_left
                    }
                    if(prevSumService < serviceCost){
                       return  sum_left - (serviceCost - prevSumService)
                    }

                    return sum_left
                }

                const data = await sequelize.query(`UPDATE service_${id} SET 
                        service_name = '${serviceName}',service_cost = '${serviceCost}',service_count = '${serviceCount}',
                        date_rendering = '${formattedData}'
                        WHERE service_id = '${service_id}'
                `)
                if(data){
                    await Contract.update({
                        sum_left:checkSum()
                    },{
                        where:{
                            contract_id:Number(id)
                        }
                    })
                    return {message:'Услуга успешно отредактирована!',status:200,
                        data:{
                        sum_left:checkSum(),
                         date_renderind,
                         service_cost:serviceCost,
                         service_count:serviceCount,
                         service_name:serviceName,
                         id:service_id
                    }}
                }
            }catch (e) {
                console.log(e)
                return {
                    message:e,
                    status:500
                }
            }
        }

        async findOne(id,service_id){
            try{
                const data = await sequelize.query(`SELECT * FROM service_${id} WHERE service_id = '${service_id}'`,{type:QueryTypes.SELECT})

                if(data){
                    return data
                }
            }catch (e){
                return {
                    message:e,
                    status:500
                }
            }
        }
}


module.exports = new Service_action()


