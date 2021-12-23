const Contract = require('../models/Contract');
const Service = require('../models/Services');
const Branch = require('../models/Branch');
const Type = require('../models/Type');
const Patient = require('../models/Patient');
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
            await Contract.create({...req.body,branch:department,date:dayjs().format('YYYY-MM-DD')})
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
            await Service.findAll({where:{
                   agreement_id:id /// поменять на contract_id
                }
            },{raw: true}).then(data=>res.json(data))
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
            }).then(res.send().status(200))
        }catch (e) {
            res.send(e).status(500)
        }
    }
    async addService(req,res,next){
        try{
            const {id} = req.body;
            const findContract = await Contract.findAll({
                where:{
                    contract_id:id
                }
            })
            const {serviceCount,serviceCost,serviceName} = req.body.data;

            await Service.create({
                service_name:serviceName,
                service_cost:serviceCost,
                service_count:serviceCount,
                agreement_id: id,
                service_left: serviceCount
            })
                .then(()=>Contract.update({
                    sum_left:findContract.dataValues.sum_left - (serviceCount*serviceCost)
                }))
                .then(data=>res.json(data))
        }catch (e) {
            return res.send(e).status(500)
        }
    }
    async editCurrentService(req,res){
        try{
            const {id} = req.params;
            await Service.findAll({
                where:{
                    agreement_id:id
                }
            }).then(data=>res.json(data))
        }catch (e) {
            return res.send(e).status(500)
        }
    }
    async deleteService(req,res,next){
        try{
            const {id} = req.body;
            await Service.destroy({where:{
                services_id: id
                }})
                .then(res.send().status(200))
        }catch (e) {
            console.log(e)
            return res.send(e).status(500)
        }
    }
    async editService(req,res,next){
        try{
            const {serviceName,serviceCost,serviceCount,id} = req.body;
            const findContract = await Contract.findAll({
                where:{
                    contract_id:id
                }
            })
            await Service.update({
                service_name:serviceName,
                service_cost:serviceCost,
                service_count:serviceCount,
                service_left:serviceCount
            },{where:{
                services_id:id
                }})
                .then(()=>Contract.update({
                    sum_left:findContract.dataValues.sum_left - (serviceCost*serviceCount)
                }))
                .then(()=>res.status(200).json({message:'Услуга добавлена'}))
        }catch (e) {
            return res.send(e).status(500)
        }
    }
    async addPatient(req,res,next){
        try{
            const {id,fio,birthday} = req.body;
            const findCurrentService = await Service.findOne({where:{
                services_id:id
                }});
            await Patient.create(
                {
                    fio,
                    birthday,
                    date_added: dayjs().format("YYYY-MM-DD"),
                    service_id:id
                })
                .then(()=>Service.update({service_left:findCurrentService.service_left-1},{
                    where:{
                        services_id:id
                    }
                }))
                .then(()=>res.status(200).json({'message':'Пациент добавлен'}))
                .catch(error=>res.status(500).json({'message':error}))

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