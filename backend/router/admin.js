const {Router} = require('express');
const mysql = require('mysql2');
const config = require('../core/config')
const connection = mysql.createConnection(config).promise();
const bcrypt = require('bcrypt');
const router = Router();
const adminController = require('../controller/adminController')

router.get('/get-users',adminController.getUsers);
router.post('/registerUser',async(req,res)=>{
    const {login,password,birthday,fio,roles,branch_id} = req.body;
    const hashed = await bcrypt.hash(password,10);
    await connection.query(`SELECT login FROM users WHERE login='${login}'`)
        .then(async(result)=>{
            if(result[0].length){
                result[0].map(item=>{
                    if(item.login === login){
                        res.status(400).json({'message':'Пользователь существует'})
                    }
                })
            }else{
                await connection.query(`INSERT into users VALUES (NULL,'${login}','${hashed}','${birthday}',${roles},'${fio}','${branch_id}')`)
                    .then(([rows,fields])=>{
                        if(rows){
                            res.json({'message':'Пользователь зарегистрирован'}) /// поправить
                        }
                    });
            }
        })
});
router.post('/setAuth',async (req,res)=>{
    const {roles,id} = req.body;
    console.log(`UPDATE users SET roles=${roles} WHERE user_id='${id}'`);
    await connection.query(`UPDATE users SET roles=${roles} WHERE user_id='${id}'`)
        .then(data=>{
            res.json({"message":"200"})
        })
})
router.post('/add-branch',async(req,res)=>{
    const {value} = req.body;
   await connection.query(`INSERT into branch VALUES (NULL,'${value}')`)
   .then(()=>{
       res.json({'data':'Успешно'})
   })
})
router.get('/user/:id',async(req,res)=>{
    const user = await connection.query(`SELECT * from users WHERE user_id=${req.params.id}`)
    const branch = await connection.query(`SELECT * from branch`)
    const branchSelect = await connection.query(`SELECT * from branch WHERE branch_id = '${user[0].map(item=>item.branch_id)}'`)
    const rolesSelect = await connection.query(`SELECT * from roles WHERE rolesId='${user[0].map(item=>item.roles)}'`)
    const roles = await connection.query(`SELECT * from roles`)
    res.render('user',{
        user:user[0],
        js:['lib/materialize.min.js','edit-user.js'],
        css:['lib/materialize.min.css'],
        branch:branch[0],
        branchSelect:branchSelect[0],
        rolesSelect:rolesSelect[0],
        roles:roles[0]
    })
})
router.post('/edit-user',async(req,res)=>{
    const {fio,login,branch,roles,id,password}=req.body;
    if(password ===''){
        console.log(`UPDATE users SET fio='${fio}',login='${login}',branch_id='${branch}',roles='${roles}' WHERE user_id='${id}'`);
        await connection.query(`UPDATE users SET fio='${fio}',login='${login}',branch_id='${branch}',roles='${roles}' WHERE user_id='${id}'`)
            .then(()=>res.json({'status':'Данные обновились'}))
    }
    if(password !==''){
        const hashed = await bcrypt.hash(password,10)
        console.log(`UPDATE users SET fio='${fio}',login='${login}',branch_id='${branch}',roles='${roles}',password = '${hashed}' WHERE user_id='${id}'`)
        await connection.query(`UPDATE users SET fio='${fio}',login='${login}',branch_id='${branch}',roles='${roles}',password = '${hashed}' WHERE user_id='${id}'`)
            .then(()=>res.json({'status':'Данные обновились'}))
    }
})
router.delete('/delete-user',adminController.deleteUser)
module.exports = router