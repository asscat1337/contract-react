const Contract = require('../models/Contract');
const Service = require('../models/Services');

class DashboardController {
    async dataContract(req, res, next) {
        try {
            const getData = await Contract.findAll({raw: true})

            const mappedData = getData.map(item => {
                return {
                    ...item,
                    children: []
                }
            })

            return res.json(mappedData)
        } catch (e) {
            console.log(e)
        }
    }

    async addContract(req, res, next) {
        try {
            const {sum, date, ended, rendering, subject, organization, branch, description} = req.body;
            await Contract.create({sum, date, ended, rendering, subject, organization, branch, description, type: 0})
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
            const {serviceCount,serviceCost,serviceName} = req.body.data;

            await Service.create({
                service_name:serviceName,
                service_cost:serviceCost,
                service_count:serviceCount,
                agreement_id: id,
                service_left: serviceCount
            }).then(data=>res.json(data))
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
            await Service.update({
                service_name:serviceName,
                service_cost:serviceCost,
                service_count:serviceCount,
                service_left:serviceCount
            },{where:{
                services_id:id
                }})
                .then(res.send().status(200))
        }catch (e) {
            return res.send(e).status(500)
        }
    }
    async addPatient(req,res,next){
        try{
            const {id,fio,birthday} = req.body;

        }catch (e) {
            return res.send(e).status(500)
        }
    }
}





module.exports = new DashboardController();