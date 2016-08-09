/*global require, console, process*/
var port = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    express = require('express'),
    app = express();

// Body Parser
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

// Error Handling
app.use(function (err, req, res, next) {
    'use strict';

    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Unexpected error! ' + err,
        stack: err.stack
    });
});

// Mongoose
require('./mongoose');

// Routes
require('./routes')(app);

app.listen(port, function () {
    'use strict';

    console.log('>> Server listening on port ' + port);
});