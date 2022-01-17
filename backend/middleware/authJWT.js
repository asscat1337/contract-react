const jwt = require('jsonwebtoken');

const authJWT=(req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(' ')[1]
        jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
            if(err){
                return res.sendStatus(403).json({message:err})
            }
            req.user = user
            next()
        })
    }else{
        return res.sendStatus(401)
    }
}

module.exports = authJWT