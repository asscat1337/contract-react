const multer = require('multer');
const fs = require('fs')
const path = require('path')

const storageConfig =  multer.diskStorage({
    destination:(req,file,cb)=>{
        fs.mkdir(path.resolve(`./upload/${req.params.contractId}`),(err)=>{
            console.log(err)
            cb(null,`upload/${req.params.contractId}`)
        })
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
});


module.exports = storageConfig