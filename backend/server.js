require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const app = express();


app.use(session({
    secret:"secret key",
    name:"cookie",
    resave:false,
    saveUninitialized: true,
}))

const port = process.env.PORT ?? 3005;
app.use(express.json())
app.use(cors())
app.use(express.json({extended: true}))

const auth = require('./router/auth');
const dashboard = require('./router/dashboard')

app.use('/auth',auth)
app.use('/dashboard',dashboard)
app.listen(port,()=>{
    console.log(`Listen in ${port}`)
})