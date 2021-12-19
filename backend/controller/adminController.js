const Users = require('../models/Users')
class AdminController {
    async getUsers(req,res,next){
        try{
            await Users.findAll()
                .then(data=>res.status(200).json(data))
        }catch (e) {
            return res.status(500).json(e)
        }
    }
    async deleteUser(req,res,next){
        try{
            const {user_id} = req.body;
            await Users.destroy({where:{
                    user_id
                }
            }).then(()=>res.status(200).json({'message':'Пользователь удален'}))
        }catch (e) {
            return res.status(500).json({error:e})
        }
    }
}




module.exports = new AdminController()