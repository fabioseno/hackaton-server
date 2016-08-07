/*global module, require*/
module.exports = function (app) {
    'use strict';
    
    var authController  = require('../controllers/auth');
    
    app.post('/login', authController.login);
    
};