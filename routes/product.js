/*global module, require*/
module.exports = function (app) {
    'use strict';
    
    var productController  = require('../controllers/product');
    
    app.get('/produtos/:codigo', productController.getProduct);
    
    app.get('/produtos/sku/:sku', productController.getSKU);
    
    app.get('/produtos/:sku/loja/:lojaId/preco', productController.getPrice);
    
};