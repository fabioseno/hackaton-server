/*global module, require*/
var Request = require('../models/request');

module.exports.searchRequests = function (req, res) {
    'use strict';

    var from = new Date(new Date() - (1000 * 60 * 60 * 24)); // último dia apenas

    Request.find({
        'lojaId': req.params.lojaId,
        'dataCriacao': { '$gte': from },
        'status': { $ne: 'Finalizada' }
    }, function (err, docs) {
        if (err) {
            return res.status(500).json({ success: false, message: err });
        }

        return res.json({ success: true, data: docs });
    });

};

module.exports.getRequest = function (req, res) {
    'use strict';

    Request.findById(req.params.id, function (err, doc) {
        if (err) {
            return res.status(500).json({ success: false, message: err });
        }

        return res.json({ success: true, data: doc });
    });
};

module.exports.addRequest = function (req, res) {
    'use strict';

    var model = new Request(req.body);

    model.status = 'Rascunho';
    model.prioridade = 1; // manual

    model.save(function (err, doc) {
        if (err) {
            return res.status(500).json({ success: false, message: err });
        }

        return res.json({ success: true, data: doc });
    });
};

module.exports.generateAuto = function (req, res) {
    'use strict';

    return res.json({ sku: 123, price: 123.34 });
};

module.exports.deleteRequest = function (req, res) {
    'use strict';

    Request.findOneAndRemove({ _id: req.params.id, status: 'Rascunho' }, function (err, doc) {
        if (err) {
            return res.status(500).json({ success: false, message: err });
        }

        if (doc) {
            return res.json({ success: true, data: doc });
        } else {
            return res.json({ success: false, message: 'Apenas solicitações no status Rascunho podem ser excluídas.' });
        }
    });
};

module.exports.deleteAll = function (req, res) {
    'use strict';

    Request.remove({}, function (err, doc) {
        if (err) {
            return res.status(500).json({ success: false, message: err });
        }

        return res.json({ success: true, message: 'Todas as solicitações foram excluídas com sucesso.' });
    });
};

module.exports.saveProduct = function (req, res) {
    'use strict';

    Request.findById(req.params.id, function (err, doc) {
        var codigoProduto = req.body.codigoProduto,
            skus = req.body.skus || [],
            i;

        if (err) {
            return res.status(500).json({ success: false, message: err });
        }

        if (doc) {
            if (doc.status === 'Rascunho') {
                if (doc.produtos) {
                    for (i = doc.produtos.length - 1; i >= 0; i -= 1) {
                        if (doc.produtos[i].codigoProduto == codigoProduto) {
                            doc.produtos.splice(i, 1);
                        }
                    }
                    
                    for (i = 0; i < skus.length; i += 1) {
                        doc.produtos.push({
                            codigoProduto: codigoProduto,
                            sku: skus[i].sku,
                            quantidade: skus[i].quantidade
                        });
                    }

                    doc.save(function (error) {
                        if (error) {
                            return res.status(500).json({ success: false, message: err });
                        }

                        return res.json({ success: true, data: doc });
                    });
                }
            } else {
                return res.status(500).json({ success: false, message: 'Apenas solicitações no status Rascunho podem ser editadas.' });
            }
        } else {
            return res.status(500).json({ success: false, message: 'Solicitação não encontrada.' });
        }
    });
};

module.exports.removeProduct = function (req, res) {
    'use strict';

    Request.findById(req.params.id, function (err, doc) {
        var codigoProduto = req.params.produtoId,
            i;
        
        if (err) {
            return res.status(500).json({ success: false, message: err });
        }

        if (doc) {
            if (doc.status === 'Rascunho') {
                if (doc.produtos) {
                    for (i = doc.produtos.length - 1; i >= 0; i -= 1) {
                        if (doc.produtos[i].codigoProduto == codigoProduto) {
                            doc.produtos.splice(i, 1);
                        }
                    }

                    doc.save(function (error) {
                        if (error) {
                            return res.status(500).json({ success: false, message: err });
                        }

                        return res.json({ success: true, data: doc });
                    });
                }
            } else {
                return res.status(500).json({ success: false, message: 'Apenas solicitações no status Rascunho podem ser editadas.' });
            }
        } else {
            return res.status(500).json({ success: false, message: 'Solicitação não encontrada.' });
        }
    });
};

module.exports.changeStatus = function (req, res) {
    'use strict';

    return res.json({ sku: 123, price: 123.34 });
};

module.exports.countAlerts = function (req, res) {
    'use strict';

    return res.json({ sku: 123, price: 123.34 });
};

module.exports.countStatus = function (req, res) {
    'use strict';

    return res.json({ sku: 123, price: 123.34 });
};