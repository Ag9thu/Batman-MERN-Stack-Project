const express = require('express');
require('dotenv').config()
const morgan = require('morgan')
const recipesRoutes = require('./routes/recipes');
const userRoutes = require('./routes/users');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const Authmiddleware = require('./middlewares/Authmiddleware');

const app = express();
app.use(express.static('public'))
const mongoURL = "mongodb+srv://aungngthu999:test1234@mernwcluster.g4mgebd.mongodb.net/?retryWrites=true&w=majority&appName=MERNWCluster"
mongoose.connect(mongoURL).then(() => {
    console.log('connected to db');
    app.listen(process.env.PORT,() => {
        console.log('app is running on '+process.env.PORT);
    })
});
app.use(cors(
    {origin : 'http://localhost:5173', 
        credentials : true}
));//local development --WARNING---
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())

app.get('/', (req,res) => {
    return res.json({hello : 'world'});
});

app.use('/api/recipes',Authmiddleware,recipesRoutes)
app.use('/api/users',userRoutes)

app.get('/set-cookie', (req,res) => {
    res.cookie('name', 'agag');
    res.cookie('impt', 'value',{httpOnly : true});
    return res.send('cookies set')
})
app.get('/get-cookie', (req,res) => {
    let cookies = req.cookies;
    return res.json(cookies)
})