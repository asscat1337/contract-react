const {Router} = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const config = require('../core/config')
const connection = mysql.createConnection(config).promise();

const router = Router();

router.get('/',async(req,res)=>{
    res.render('auth/login',{
        css:['auth.css'],
        js:['auth.js'],
        isLogin:true,
        isAuth:req.session.isAuth
    })
});
router.get('/register',async(req,res)=>{
    res.render('auth/register',{
        css:['register.css'],
        js:['register.js'],
        isRegister:true
    })
});
router.post('/loginUser',async(req,res)=>{
    const {login,password} = req.body;
    let branch
    connection.query(`SELECT * from users WHERE login='${login}'`)
        .then(result=>{
            if(result[0].length){
                result[0].map(item=>{
                    connection.query(`SELECT * from branch WHERE branch_id='${item.branch_id}'`)
                            .then(result=>{
                                result[0].map(item=>{
                                  branch = item.description;
                                })
                            })
                    bcrypt.compare(password,item.password,(err,result)=>{
                        if(login==="admin" && result){
                            req.session.isAuth = true;
                            req.session.username = login;
                            req.session.rolesId = item.roles;
                            return res.redirect('/admin')
                        }
                        if(result) {
                            // req.session.isAuth = true;
                            req.session.username = login;
                            req.session.rolesId = item.roles;
                            req.session.branchId = branch
                            req.session.fio = item.fio
                            return res.json({"status":'ok'})
                        }
                        else{
                            res.status(400).json({"message":"Неверный логин или пароль"})
                        }
                    })
                })
            }
        })
});
router.get('/logout',(req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
})

module.exports = router;