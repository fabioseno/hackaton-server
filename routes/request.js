/*global module, require*/
module.exports = function (app) {
    'use strict';
    
    var requestController  = require('../controllers/request');
    
    app.get('/solicitacoes/loja/:lojaId', requestController.searchRequests);
    
    app.get('/solicitacoes/:id', requestController.getRequest);
    
    app.put('/solicitacoes', requestController.addRequest);
    
    app.get('/solicitacoes/loja/:lojaId/gerar', requestController.generateAuto);
    
    app.delete('/solicitacoes/limpar', requestController.deleteAll);
    
    app.delete('/solicitacoes/:id', requestController.deleteRequest);
    
    app.post('/solicitacoes/:id/produtos', requestController.saveProduct);
    
    app.delete('/solicitacoes/:id/produtos/:produtoId', requestController.removeProduct);
    
    app.post('/solicitacoes/:id/alterarStatus', requestController.changeStatus);
    
    app.get('/solicitacoes/loja/:lojaId/totalAlertas', requestController.countAlerts);
    
    app.get('/solicitacoes/loja/:lojaId/alertas', requestController.getAlerts);
    
    app.get('/solicitacoes/loja/:lojaId/totalStatus', requestController.countStatus);
    
};