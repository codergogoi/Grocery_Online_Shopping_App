const express = require('express');
const proxy = require('express-http-proxy');

const { PORT } = require('./config');

const app = express();

const product = proxy('http://localhost:8001');
const customer = proxy('http://localhost:8002');
const shopping = proxy('http://localhost:8003');


app.use((req, res, next) => {
    next();
})
 

app.use('/customer', async(req,res,next) => {
    try {
       await customer(req,res,next);
    } catch (erro) {
        console.log(erro);
        res.status(500).json('Service is not Online to serve')
    }
})


app.use('/shopping', async(req,res,next) => {
    await shopping(req,res,next);
})
  

app.use('/', async(req,res,next) => {
    try {
        await product(req,res,next);
     } catch (erro) {
         console.log(erro);
         res.status(500).json('Service is not Online to serve')
     }
})

app.listen(PORT, () => {
    console.log(`Listening to 8000`)
})

