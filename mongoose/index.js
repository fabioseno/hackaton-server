/*global require, console*/
var mongoose = require('mongoose'),
    dbConfig = require('./config'),
    db = mongoose.connection;

mongoose.connect(dbConfig.url);

db.on('error', console.error);

db.once('open', function () {
    'use strict';

    console.log('>> Database connected...');
});