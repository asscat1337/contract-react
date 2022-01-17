const PatientAction = require("../databases/patient_action");

class patientController {
    async addPatient(req,res,next){
        try{
            const {id,service_id,fio,birthday} = req.body;
            const checkTable = await PatientAction.checkTable(id)
            if(checkTable.length){
                const data = await PatientAction.addPatient(fio,birthday,service_id,id)
                return res.status(200).json(data)
            }else {
                await PatientAction.createTablePatient(id)
                    .then(async ()=>{
                    await PatientAction.addPatient(fio,birthday,service_id,id)
                })
                return res.status(200).json('123')
            }

        }catch (e) {
            return res.send(e).status(500)
        }
    }

    async showPatient(req,res,next){
        try{
            const {id} = req.body

            const data = await PatientAction.selectPatient(id)

            return res.status(200).json(data)

        }catch (e) {
            return res.status(500).json(e)
        }
    }

    async deletePatient(req,res,next){
        try{
            const {id,patient_id} = req.body

            const data = PatientAction.deletePatient(id,patient_id)

            return res.status(200).json(data)


        }catch (e) {
            return res.status(500).json(e)
        }

    }


}


module.exports = new patientController()