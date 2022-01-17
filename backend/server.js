require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const app = express();
const path = require('path');

app.use(session({
    secret:"secret key",
    name:"cookie",
    resave:false,
    saveUninitialized: true,
}))

app.use(express.static(path.resolve(__dirname,'../build')));




const port = process.env.PORT ?? 3005;
app.use(express.json());
app.use(cors());
app.use(express.json({extended: true}));

const auth = require('./router/auth');
const dashboard = require('./router/dashboard');
const admin = require('./router/admin');
const patient = require('./router/patient')

app.use('/Auth',auth)
app.use('/dashboard',dashboard);
app.use('/admin',admin);
app.use('/patient',patient)

app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../build','index.html'))
})
app.listen(port,()=>{
    console.log(`Listen in ${port}`)
})