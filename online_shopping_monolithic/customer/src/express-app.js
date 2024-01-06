const express = require('express');
const cors  = require('cors');
const { customer, appEvents } = require('./api');
const HandleErrors = require('./utils/error-handler')


module.exports = async (app) => {

    app.use(express.json({ limit: '1mb'}));
    app.use(express.urlencoded({ extended: true, limit: '1mb'}));
    app.use(cors());
    app.use(express.static(__dirname + '/public'))

    //api
    appEvents(app);
    customer(app);

    // error handling
    app.use(HandleErrors);
    
}