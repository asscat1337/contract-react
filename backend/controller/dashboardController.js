const Contract = require('../models/Contract');
const ServiceAction = require('../databases/service_action')
const PatientAction = require('../databases/patient_action')
const Branch = require('../models/Branch');
const Type = require('../models/Type');
const {Op} = require('sequelize');
const dayjs = require('dayjs');
const csvParser = require('csv-parser');
const fs = require('fs');

class DashboardController {
    async dataContract(req, res, next) {
        try {
            const {page,size,branch,roles} = req.query;
             const test = Number(roles) === 2 ? {[Op.not]:branch} : {[Op.eq]:branch}
             console.log(req.query)
            const getData = await Contract.findAndCountAll({
                where:{
                    branch: test

                },
                raw: true,
                limit:Number(size),
                offset:Number(page),
            });
            const mappedData = getData.rows.map(item => {
                return {
                    ...item,
                    children: []
                }
            })

            return res.json({count:getData.count,rows:mappedData})
        } catch (e) {
            console.log(e)
        }
    }

    async addContract(req, res, next) {
        try {
            const {department} = req.body
            await Contract.create({
                ...req.body,
                branch:department,
                date:dayjs().format('YYYY-MM-DD'),
                sum_left:req.body.sum
            })
                .then(() => {
                    return res.send('ok').status(200)
                })
        } catch (e) {
            if (e) {
                res.status(500).send(e)
            }
        }

    }
    async findService(req,res,next){
        try {
            const {id} = req.body;
            const tables_length =  await ServiceAction.ActionCheckTable(id)
            if(tables_length.length){
                const data = await ServiceAction.showService(id)
                console.log(data)
                return res.json(data)
            }else{
                await ServiceAction.createService(id)
            }
        }catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    }
    async deleteContract(req,res,next){
        try{
            const {current} = req.body
            await Contract.destroy({where:{
                contract_id:current
                }
            })
                .then(async ()=>{
                    await ServiceAction.dropTable(current)
                    await PatientAction.dropTable(current)
                })
        }catch (e) {
            res.send(e).status(500)
        }
        finally {
            return {
                message:'Запись успешно удалена!'
            }
        }
    }
    async addService(req,res,next){
        try{
            const {id} = req.body;
            const findContract = await Contract.findAll({
                where:{
                    contract_id:id
                },
                raw:true
            })

            const {serviceCount,serviceCost,serviceName} = req.body.data;
            const {sum_left} = findContract[0]
            const data = await ServiceAction.addService(serviceCount,serviceCost,serviceName,id,sum_left)

            return res.status(200).json(data)

        }catch (e) {
            return res.send(e).status(500)
        }
    }
    async editCurrentService(req,res){
        try{
            const {id} = req.params;

            const checkService = await ServiceAction.ActionCheckTable(id)

            if(checkService.length){
                const data = await ServiceAction.showService(id)

                return res.status(200).json(data)
            }else {
                await ServiceAction.createService(id)
            }

        }catch (e) {
            return res.status(500).send(e)
        }
    }
    async deleteService(req,res,next){
        try{
             const {id,deletedId} = req.body;
             const data = await ServiceAction.deleteService(id,deletedId)

            return res.status(200).json(data)

        }catch (e) {
            return res.send(e).status(500)
        }
    }
    async editService(req,res,next){
        try{
            const {service_name,service_cost,service_count,prevSumService,id,service_id} = req.body;
            const findContract = await Contract.findAll({
                where:{
                    contract_id:id
                },
                raw:true
            })
            const {sum_left} = findContract[0]
            const result =  await ServiceAction.updateService(id,service_name,service_cost,service_count,service_id,sum_left,prevSumService)
            return res.status(200).json(result)
        }catch (e) {
            return res.send(e).status(500)
        }
    }
    async editContract(req,res,next){
        try {
            const {id} = req.body;
            await Contract.update(req.body,{
                where:{
                    contract_id:id
                }
            })
                .then(()=>res.status(200).send())
        }catch (e) {
            return res.send(e).status(500)
        }
    }
    async addContractFromXlsx(req,res,next){
        try{
            const fileXlsx = fs.readFileSync(`./upload/${req.file.filename}`);
             const workbook = xlsx.read(fileXlsx,{type:"buffer"});
            console.log(workbook.Sheets)
        }catch(e) {
            console.log(e)
        }
    }
    async getType(req,res,next){
        try{
            const getType = await Type.findAll()
            const transformedType = getType.map(item=>{
                return {
                    value:item.type_id,
                    label:item.title
                }
            })
            return res.status(200).json(transformedType)
        }catch (e) {
            return res.status(500).json({message:e})
        }
    }
    async uploadFile(req,res,next){
        try{
            const result = []
            const {path} = req.file
            fs.createReadStream(path)
                .pipe(csvParser())
                .on('data',(data)=>result.push(data))
                .on('end',()=>{
                    result.map(async (item)=>{
                        await Branch.create({
                            description:item.otd
                        })
                    })
                }).then(()=>res.status(200).json({message:'Файл загружен успешно'}))
        }catch (e) {
            console.log(e)
            return res.status(500).json(e)
        }
    }
    async addDepartment(req,res,next){
        try{
            const {department} = req.body
            await Branch.create({description:department})
                .then(()=>res.status(200).send({message:'Отделение успешно добавлено!'}))
        }catch (e) {
            return res.status(500).send({error:'Произошла ошибка при выполнение запроса'})
        }
    }

}





module.exports = new DashboardController();