/*global module, require*/
module.exports = function (app) {
    'use strict';

    app.all('*', function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
        res.header('Access-Control-Expose-Headers', 'SessionId');
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');

        next();
    });

    app.get('/', function (req, res) {
        res.send('Backend maroto está de pé!');
    });

    require('./auth')(app);
    require('./product')(app);
    require('./request')(app);
};