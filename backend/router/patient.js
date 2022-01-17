const {Router} = require('express')
const patientController = require('../controller/patientController')

const router = Router()

router.post('/',patientController.showPatient)
router.post('/add-patient',patientController.addPatient)
router.post('/delete-patient',patientController.deletePatient)




module.exports = router