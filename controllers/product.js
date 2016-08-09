/*global module, require, Buffer*/
var http = require('https'),
    querystring = require('querystring'),

    host = 'vendadigitalmb.lojasrenner.com.br',
    appKey = 'c81efd66a79b6c5a58bfad182f150695',
    appSecret = '13c3374b5d3332c4b2efef4d04d47c26',

    cookies,

    connectToMobileFabric = function (success) {
        'use strict';

        var options = {
            host: host,
            path: '/authService/100000002/login',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Kony-App-Secret': appSecret,
                'X-Kony-App-Key': appKey,
                'Accept': 'application/json'
            }
        },

            callback = function (response) {
                var str = '', setcookie;

                cookies = [];

                setcookie = response.headers["set-cookie"];

                if (setcookie) {
                    setcookie.forEach(
                        function (cookiestr) {
                            cookies.push(cookiestr);
                        }
                    );
                }

                //another chunk of data has been recieved, so append it to `str`
                response.on('data', function (chunk) {
                    str += chunk;
                });

                //the whole response has been recieved, so we just print it out here
                response.on('end', function () {
                    success(JSON.parse(str).claims_token.value);
                });
            };

        http.request(options, callback).end();
    },

    getSessionConfirmationNumber = function (success) {
        'use strict';

        connectToMobileFabric(function (authToken) {
            var options = {
                host: host,
                path: '/services/ATGRest/GetSessionConfirmationNumber',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Kony-Authorization': authToken,
                    'Accept': 'application/json',
                    'Cookie': cookies.join('; ')
                }
            },

                callback = function (response) {
                    var str = '', setcookie;

                    setcookie = response.headers["set-cookie"];

                    if (setcookie) {
                        setcookie.forEach(
                            function (cookiestr) {
                                cookies.push(cookiestr);
                            }
                        );
                    }

                    //another chunk of data has been recieved, so append it to `str`
                    response.on('data', function (chunk) {
                        str += chunk;
                    });

                    //the whole response has been recieved, so we just print it out here
                    response.on('end', function () {
                        success(authToken);
                    });
                };

            http.request(options, callback).end();
        });
    };

module.exports.getProduct = function (req, res) {
    'use strict';

    var productCode = req.params.codigo;

    getSessionConfirmationNumber(function (authToken) {
        var postData = 'codigo=' + productCode,
            options = {
                host: host,
                path: '/services/ATGRest/GetProduto',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/xml',
                    'X-Kony-Authorization': authToken,
                    'Cookie': cookies.join('; ')
                }
            },

            callback = function (response) {
                var str = '';

                //another chunk of data has been recieved, so append it to `str`
                response.on('data', function (chunk) {
                    str += chunk;
                });

                //the whole response has been recieved, so we just print it out here
                response.on('end', function () {
                    res.send({ success: true, data: JSON.parse(str) });
                });

                response.on('error', function (error) {
                    console.log(error);
                });
            },

            postRequest = http.request(options, callback);

        postRequest.write(postData);
        postRequest.end();
    });
};

module.exports.getSKU = function (req, res) {
    'use strict';

    var sku = req.params.sku;

    getSessionConfirmationNumber(function (authToken) {
        var postData = 'sku=' + sku,
            options = {
                host: host,
                path: '/services/ATGRest/GetSku',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/xml',
                    'X-Kony-Authorization': authToken,
                    'Cookie': cookies.join('; ')
                }
            },

            callback = function (response) {
                var str = '';

                //another chunk of data has been recieved, so append it to `str`
                response.on('data', function (chunk) {
                    str += chunk;
                });

                //the whole response has been recieved, so we just print it out here
                response.on('end', function () {
                    res.send({ success: true, data: JSON.parse(str) });
                });
            },

            postRequest = http.request(options, callback);

        postRequest.write(postData);

        postRequest.end();
    });
};

module.exports.getPrice = function (req, res) {
    'use strict';

    return res.json({ price: 123.34 });
};

module.exports.getOutOfStock = function (req, res) {
    'use strict';

    return res.json({ sku: 123, price: 123.34 });
};