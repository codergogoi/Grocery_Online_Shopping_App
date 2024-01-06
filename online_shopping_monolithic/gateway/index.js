const express = require('express');
const cors = require('cors');
const proxy = require("express-http-proxy");
const PORT = 8000;

const StartServer = async() => {
    const app = express();

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