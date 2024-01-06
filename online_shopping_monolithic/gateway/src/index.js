const express = require('express');
const { PORT } = require('./config');
const { databaseConnection } = require('./database');
const expressApp = require('./express-app');
const cors = require('cors');
const proxy = require("express-http-proxy");

const StartServer = async() => {
    const app = express();
    
    await databaseConnection();
    
    await expressApp(app);

    app.use(cors());
    app.use(express.json());

    app.use('/customer',proxy('localhost:8001'));
    app.use('/shopping',proxy('localhost:8003'));
    app.use("/", proxy("localhost:8002")); //products

    app.listen(PORT, () => {
        console.log("From Gateway");
        console.log(`listening to port ${PORT}`);
    })
    .on('error', (err) => {
        console.log(err);
        process.exit();
    })
}

StartServer();