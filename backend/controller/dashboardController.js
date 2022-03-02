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
            const getData = await Contract.findAndCountAll({
                where:{
                    branch: test

                },
                raw: true,
                limit:Number(size),
                offset:Number(page),
            });
            const noLink = ({link,...rest})=>rest
            const mappedData = getData.rows.map(item => {
                return noLink({
                    ...item,
                    children: []
                })
            })
            return res.json({count:getData.count,rows:mappedData})
        } catch (e) {
            console.log(e)
        }
    }

    async addContract(req, res, next) {
        try {
            const {department} = req.body
            const added = await Contract.create({
                ...req.body,
                branch:department,
                date:dayjs().format('YYYY-MM-DD'),
                sum_left:req.body.sum
            })
            return res.status(200).json(added)
        } catch (e) {
            if (e) {
                res.status(500).send(e)
            }
        }

    }

    async uploadContract(req,res,next){
        try{
            console.log(req.file)
            await Contract.update({
                link:fs.readFileSync(
                    `./${req.file.path}`
                ),
                filename:req.file.filename
            },{
                where:{
                    contract_id:req.params.contractId
                }
            })

            return res.status(200).send("ok")

        }catch (e){
            console.log(e)
            return res.status(500).json(e)
        }
    }

    async findService(req,res,next){
        try {
            const {id} = req.body;
            const tables_length =  await ServiceAction.ActionCheckTable(id)
            if(tables_length.length){
                const data = await ServiceAction.showService(id)
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
            const deletedData = await Contract.destroy({where:{
                contract_id:current
                }
            })
            if(deletedData){
                const checkTable = await ServiceAction.ActionCheckTable(current)
                const checkPatient = await PatientAction.checkTable(current)
                if(checkTable.length){
                    await ServiceAction.dropTable(current)
                }
                if(checkPatient.length){
                    await PatientAction.dropTable(current)
                }
                return res.status(200).json({'message':'Удалено'})
            }
        }catch (e) {
            console.log(e)
            res.status(500).send(e)
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

            const {service_count,service_cost,service_name,date_rendering} = req.body.data;
            const {sum_left} = findContract[0]
            const data = await ServiceAction.addService(service_count,service_cost,service_name,dayjs(date_rendering).format('YYYY-MM-DD'),id,sum_left)

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

                return res.status(200).json({data:data})
            }else {
                await ServiceAction.createService(id)
                return res.status(200).json({message:'Таблица успешно создана!',data:[]})
            }

        }catch (e) {
            return res.status(500).send(e)
        }
    }
    async deleteService(req,res,next){
        try{
             const {agreement_id,service_id,service_cost,service_count} = req.body;
             console.log(req.body)
             const data = await ServiceAction.deleteService(agreement_id,service_id,service_cost,service_count)

            return res.status(200).json(data)

        }catch (e) {
            return res.send(e).status(500)
        }
    }

    async downloadFile(req,res,next){
        try{
            await Contract.findOne({
                where:{
                    contract_id:req.params.id
                },
                raw:true
            })
                .then(data=>res.status(200).send(data.link))

        }catch (e) {
            console.log(e)
            return res.status(500).send(e)
        }
    }

    async editService(req,res,next){
        try{
            const {service_name,service_cost,service_count,prevSumService,id,service_id,date_rendering} = req.body;
            const findContract = await Contract.findAll({
                where:{
                    contract_id:id
                },
                raw:true
            })
            const {sum_left} = findContract[0]
            const result =  await ServiceAction.updateService(id,service_name,service_cost,service_count,service_id,sum_left,prevSumService,date_rendering)
            return res.status(200).json(result)
        }catch (e) {
            return res.send(e).status(500)
        }
    }
    async editContract(req,res,next){
        try {
            const {id,type} = req.body;
            console.log(req.body)
            await Contract.update(req.body,{
                where:{
                    contract_id:id
                }
            })
                .then(()=>res.status(200).json({'message':`${type} успешно отредактирован`}))
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