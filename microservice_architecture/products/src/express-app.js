const express = require('express');
const cors  = require('cors');
const path = require('path');
const {products, appEvents } = require('./api');

module.exports = async (app) => {

    app.use(express.json());
    app.use(cors());
    app.use(express.static(__dirname + '/public'))

    //api
    appEvents(app);
    products(app);
    // error handling
    
}