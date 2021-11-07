const {Router} = require('express');
const mysql = require('mysql2');
const config = require('../core/config')
const connection = mysql.createConnection(config).promise();
const fs = require('fs')
const csvParser = require('csv-parser')
const router = Router();

router.get('/',async(req,res)=>{
    // if(!req.session.isAuth){
    //     return res.redirect('/')
    // }else{
        ///попроавить
        // if(req.session.branchId){
        //     await connection.query(`SELECT * from contract WHERE branch = '${req.session.branchId}'`)
        //     .then(async([rows,fields])=>{
        //         console.log(rows)
        //                 await connection.query('SELECT * from services')
        //                     .then(async([rows2])=>{
        //                         await connection.query('SELECT * from branch')
        //                         .then(([rows3])=>{
        //                             res.render('dashboard',{
        //                                 js:['lib/burger.js','dashboard.js'],
        //                                 css:['dashboard.css'],
        //                                 dog:rows,
        //                                 sum:rows2,
        //                                 isActive:true,
        //                                 isAuth:req.session.isAuth,
        //                                 rolesId:req.session.rolesId,
        //                                 user:req.session.username,
        //                                 fio:req.session.fio,
        //                                 branch:rows3
        //                             })
        //                         })
        //                     })
        //     })
        // }else{
            await connection.query(`SELECT * from contract`)
            .then(async([rows,fields])=>{
                        await connection.query('SELECT * from services')
                            .then(async([rows2])=>{
                                await connection.query('SELECT * from branch')
                                .then(([rows3])=>{
                                    const mappedArr = rows.map((row,i)=>{
                                        return {
                                            ...row,
                                            children:[]
                                        }
                                    })
                                    res.json(mappedArr)
                                })
                        })
      })
    //         ///
    //     }
    // }
});
router.get('/add-dog',async(req,res)=>{
    const results = []
    fs.createReadStream('./router/hospitals.csv')
        .pipe(csvParser())
        .on('data',(data)=>results.push(data))
    await connection.query('SELECT * from branch')
    .then(([rows])=>{
        res.render('add-dog',{
            rolesId:req.session.rolesId,
            isActive:true,
            isAuth:req.session.isAuth,
            user:req.session.username,
            fio:req.session.fio,
            js:['lib/burger.js','add.js'],
            css:['add-dog.css'],
            branch:rows,
            hospitals:results
        })
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
router.post('/addService',async(req,res)=>{
    const {name,cost,count,agreementId} = req.body;
    console.log(req.body)
    await connection.query(`INSERT INTO services VALUES(NULL,'${name}','${cost}','${count}','${agreementId}','${count}')`)
        .then(([rows,fields])=>{
            if(rows){
              res.json({'message':'Запись добавлена'})
            }
        })
})
router.post('/addData',async(req,res)=>{
    const {date,numberContract,validity,description,org,branch} = req.body;
    connection.query(`INSERT into contract VALUES(NULL,'${date}','${numberContract}','${validity}','${description}','${branch}','${org}')`)
        .then(([rows,fields])=>{
            if(rows){
                console.log(rows)
                //res.redirect('/dashboard')
            }
        })
});
router.post('/findService',async(req,res)=>{
    const {id} = req.body;
    console.log(id)
    await connection.query(`SELECT * from services WHERE agreement_id='${id}'`)
        .then(([rows,fields])=>{
            if(rows){
                res.json(rows)
            }
        })
})
router.post('/add',async(req,res)=>{
    const {date,sumDog,validity,description,rendering,org,branch,type} = req.body;
    connection.query(`INSERT into contract VALUES(NULL,'${date}','${sumDog}','${validity}','${rendering}','${description}','${branch}','${org}',${type})`)
        .then(([rows,fields])=>{
            if(rows){
                console.log(rows)
                return res.redirect(`/dashboard/edit-dashboard/${rows.insertId}`)
            }
        })
});
router.post('/remove',async(req,res)=>{
    const {id} = req.body;
    await connection.query(`DELETE from contract WHERE agreement_id='${id}'`)
        .then(async()=>await connection.query(`DELETE from services WHERE agreement_id='${id}'`))
        .then(()=>res.redirect('/dashboard'))
})
router.post('/removeService',async(req,res)=>{
    const {id} = req.body;
    await connection.query(`DELETE from services WHERE services_id='${id}'`)
        .then(([rows,fields])=>{
            if(rows){
                res.redirect('/dashboard')
            }
        })
});
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
router.get('/add-patient',async(req,res)=>{
    res.render('add-patient',{
        isAuth:req.session.isAuth,
        user:req.session.username,
        fio:req.session.fio,
        isActive:true,
        rolesId:req.session.rolesId,
        js:['lib/burger.js','dashboard.js'],
        css:['add-patient.css']
    })
})
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
router.post('/update-service',async(req,res)=>{
    const {id,name,cost,count} = req.body;
    await connection.query(`UPDATE services SET service_name = '${name}'
    ,service_cost='${cost}'
    ,service_count='${count}' WHERE services_id='${id}'`)
        .then(res.json({'message':'Данные обновились'}))
        .catch(e=>res.json({'error':e}))
})
module.exports = router