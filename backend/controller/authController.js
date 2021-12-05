const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');
const Branch = require('../models/Branch');
const Roles=  require('../models/Roles');


class AuthController {
    async loginUser(req,res,next){
        try{
            const {login,password} = req.body;
            const candidate = await Users.findAll({where:{
                login
                },
                include:[
                    {model:Branch,attributes:["description"]},
                    {model:Roles}
                ]
            });
             const hashedPassword = await bcrypt.compare(password,candidate[0].dataValues.password);
             if(!hashedPassword){
                  res.status(401).send({error:'Неверный пароль'})
             }
            if(!candidate.length){
                return res.status(401).json({error:'Такого пользователя не существует'})
            }
            if(candidate.length && hashedPassword){
                const JWTToken = jwt.sign({
                    login,
                    role:candidate[0].dataValues.roleRolesId,
                    branch:candidate[0].dataValues.branch.dataValues.description,
                },process.env.SECRET_KEY,{
                    "expiresIn":"3 days"
                })
                return res.status(200).json({
                    success:true,
                    token:JWTToken,
                    role:candidate[0].dataValues.roleRolesId,
                    branch:candidate[0].dataValues.branch.dataValues.description,
                    user:login
                })
            }
        }catch (e) {
            console.log(e)
            return res.status(500).json({error:e})
        }
    }
    async resetPassword(req,res,next){
        try{
            const {login,resetPassword,confirmResetPassword} = req.body;
            if(resetPassword !== confirmResetPassword){
                return res.status(400).json({error:'Пароли не совпадают'})
            }else{
                const changePassword = await bcrypt.hash(resetPassword,3)
                await Users.update({
                    password:changePassword
                },{where:{
                    login
                    }}).then(()=>res.status(200).json({message:'Пароль успешно восстановлен'}))
            }
        }catch (e) {
            return res.status(500).json({error:'Произошла ошибка при выполнении запроса'})
        }

    }
}



module.exports = new AuthController()