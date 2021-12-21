const {Router} = require('express');
const mysql = require('mysql2');
const config = require('../core/config')
const connection = mysql.createConnection(config).promise();
const fs = require('fs')
const csvParser = require('csv-parser')
const router = Router();
const dashboardController = require('../controller/dashboardController');
const protect = require('../middleware/authJWT')
const storageConfig = require('../middleware/storage');
const multer = require('multer');

router.get('/',protect,dashboardController.dataContract);
router.get('/get-branch',async (req,res)=>{
    await connection.query('SELECT * from branch')
        .then(([rows])=>{
            const mappedDepartment = rows.map(row=>{
                return {
                    value:row.branch_id,
                    label:row.description
                }
            })
            return res.json(mappedDepartment)
        })
})
router.post('/upload-file',multer({storage: storageConfig}).single('file'),dashboardController.uploadFile)
router.get('/add-dog',async (req,res)=>{
    const results = [];
    await fs.createReadStream('./router/hospitals.csv')
        .pipe(csvParser())
        .on('data',(data)=>results.push(data))
        .on('end',()=>{
            return res.json(results)
        })
});
router.get('/add-service/:id',(req,res)=>{
    res.render('add-service', {
        isAuth:req.session.isAuth,
        rolesId:req.session.rolesId,
        user:req.session.username,
        fio:req.session.fio,
        isActive:true,
        js: ['add.js'],
        css:['add-service.css'],
        data:req.params.id
    })
})
router.post('/addService',dashboardController.addService)
router.get('/getService/:id',dashboardController.editCurrentService)
router.post('/findService',dashboardController.findService);
router.post('/add',dashboardController.addContract);
router.delete('/delete-contract',dashboardController.deleteContract);
router.post('/delete-service',dashboardController.deleteService);
router.post('/edit-contract',dashboardController.editContract)
router.post('/updateData',async(req,res)=>{
    console.log(req.body)
    async function updateData(){
        req.body.map(async(item)=>{
            await connection.query(`UPDATE contract SET ${item.classEdit}='${item.valuesEdit}' WHERE agreement_id='${item.id}'`)
                .then(()=>res.json({'message':'Данные обновились'}))
                .catch(e=>res.json({'message':`Ошибка ${e}`}))
        })
    }
    //поправить
     updateData()
});
router.post('/showAllSum',async(req,res)=>{
        connection.query(`SELECT * from services`)
            .then((result)=>{
               return res.json(result[0])
    })
})
router.post('/showCount',async(req,res)=>{
    /// нужно переделать
    const {data} = req.body;
        connection.query(`SELECT service_id,count(service_id) as count from patient WHERE service_id='${data}'`)
            .then(([rows])=>{
                res.json(rows)
            })
            ///
})
router.get('/get-type',dashboardController.getType)
router.post('/add-patient',dashboardController.addPatient);
router.post('/upload-file',multer({storage:storageConfig}).single('file'),dashboardController.addContractFromXlsx);
/// переделать позже
router.post('/showAllService',async(req,res)=>{
    const {id} = req.body;
    await connection.query(`SELECT * from services WHERE agreement_id='${id}' and service_left !=0`)
        .then(result=>{
          res.json(result[0])
        })
})
///
router.post('/addPat',async(req,res)=>{
    const {id,fio,birthday} = req.body;
    id.map(item=>{
         connection.query(`INSERT into patient VALUES (NULL,'${fio}','${birthday}',NOW(),'${item}')`)
         connection.query(`UPDATE services SET service_left = service_left-1 WHERE services_id=${item}`)
    });
   return res.json({'message':'Пользователь добавлен'})
});
router.post('/showPatient',async(req,res)=>{
    const {id} = req.body;
    await connection.query(`SELECT * from patient WHERE service_id='${id}'`)
        .then(result=>{
            res.status(200).json(result[0])
        })
});
router.post('/getSum',async(req,res)=>{
    const {id} = req.body;
    console.log(req.body);
    await connection.query(`SELECT sum1 FROM contract WHERE contract_id='${id}'`)
        .then(result=>{
            res.json(result[0])
        })
})
router.post('/getSumAgreement',async(req,res)=>{
    const {id} = req.body;
    await connection.query(`SELECT sum2 FROM agreement WHERE agreement_id='${id}'`)
        .then(result=>{
            res.json(result[0])
        })
})
router.get('/edit-dashboard/:id',async(req,res)=>{
    let services,branch;
    const results = []
    fs.createReadStream('./router/hospitals.csv')
        .pipe(csvParser())
        .on('data',(data)=>results.push(data))
        await connection.query(`SELECT * from services WHERE agreement_id='${req.params.id}'`)
            .then(([rows])=>{
                services = rows
            });
        await connection.query(`SELECT * from branch`)
            .then(([rows])=>{
                 branch = rows
            });
    await connection.query(`SELECT * from contract WHERE agreement_id='${req.params.id}'`)
        .then(([rows])=>{
            res.render('edit-dashboard',{
                js:['lib/burger.js','lib/toast.js','edit-contract.js'],
                css:['edit-contract.css'],
                isActive:true,
                user:req.session.username,
                fio:req.session.fio,
                isAuth:req.session.isAuth,
                updates:rows,
                services,
                branch,
                org:results
            })
        })
})
router.post('/update-service',dashboardController.editService)
module.exports = router