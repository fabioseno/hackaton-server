/*global module, require, Object*/
var Request = require('../models/request');

module.exports.searchRequests = function (req, res) {
    'use strict';

    var from = new Date(new Date() - (1000 * 60 * 60 * 24)); // último dia apenas

    Request.find({
        'lojaId': req.params.lojaId,
        'dataCriacao': { '$gte': from },
        'status': { $ne: 'Finalizada' }
    }, null, {sort: 'prioridade'}, function (err, docs) {
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

    var model = new Request({
        "tipo": "A",
        "prioridade": 0,
        "status": "Rascunho",
        "lojaId": req.params.lojaId,
        "dataCriacao": new Date(),
        "usuarioCriacao": "sistema",
        "grupo": "F/Marfinno",
        "totalProdutos": 2,
        "skus": [
            {
                "codigoProduto": "123",
                "sku": "234",
                "quantidade": 4,
                "grupo": "F/Marfinno"
            },
            {
                "codigoProduto": "123",
                "sku": "678",
                "quantidade": 1,
                "grupo": "F/Marfinno"
            }
        ]
    });

    model.save(function (err, doc) {
        if (err) {
            return res.status(500).json({ success: false, message: err });
        }

        return res.json({ success: true, data: doc });
    });
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
            totalProdutos = 0,
            requestGroup,
            groups = {},
            keys,
            i;

        if (err) {
            return res.status(500).json({ success: false, message: err });
        }

        if (doc) {
            if (doc.skus && doc.status === 'Rascunho') {
                for (i = doc.skus.length - 1; i >= 0; i -= 1) {
                    if (doc.skus[i].codigoProduto == codigoProduto) {
                        doc.skus.splice(i, 1);
                    } else {
                        totalProdutos += 1;
                    }
                }

                for (i = 0; i < skus.length; i += 1) {
                    doc.skus.push({
                        codigoProduto: codigoProduto,
                        sku: skus[i].sku,
                        quantidade: skus[i].quantidade
                    });

                    groups[skus[i].grupo] = true;
                    
                    totalProdutos += 1;
                }
                
                doc.totalProdutos = totalProdutos;

                if (Object.keys(groups).length > 1) {
                    doc.grupo = 'Vários';
                } else {
                    keys = Object.keys(groups);

                    if (keys.length === 1) {
                        doc.grupo = groups[keys[0]];
                    }
                }

                doc.save(function (error) {
                    if (error) {
                        return res.status(500).json({ success: false, message: err });
                    }

                    return res.json({ success: true, data: doc });
                });
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
                if (doc.skus) {
                    for (i = doc.skus.length - 1; i >= 0; i -= 1) {
                        if (doc.skus[i].codigoProduto == codigoProduto) {
                            doc.skus.splice(i, 1);
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

    Request.findById(req.params.id, function (err, doc) {
        var codigoProduto = req.params.produtoId,
            usuarioEmSeparacao = req.body.usuario,
            nextStatus = req.body.status,
            skus = req.body.skus,
            i,
            j;

        if (err) {
            return res.status(500).json({ success: false, message: err });
        }

        if (doc) {
            if (doc.status === 'Rascunho' && nextStatus === 'Pendente') {
                doc.status = 'Pendente';
                doc.dataPendente = new Date();
            } else if (doc.status === 'Pendente' && nextStatus === 'EmSeparacao') {
                if (!usuarioEmSeparacao) {
                    return res.status(500).json({ success: false, message: 'Usuário não foi informado.' });
                }

                doc.status = 'EmSeparacao';
                doc.dataEmSeparacao = new Date();
                doc.usuarioEmSeparacao = usuarioEmSeparacao;
            } else if (doc.status === 'EmSeparacao' && nextStatus === 'Separada') {
                doc.status = 'Separada';
                doc.dataSeparada = new Date();

                for (i = 0; i < doc.skus.length; i += 1) {
                    for (j = 0; j < skus.length; j += 1) {
                        if (doc.skus[i].sku == skus[j].sku) {
                            doc.skus[i].quantidadeSeparada = skus[j].quantidadeSeparada;
                            break;
                        }
                    }
                }

            } else if (doc.status === 'Separada' && nextStatus === 'Finalizada') {
                doc.status = 'Finalizada';
                doc.dataFinalizacao = new Date();
            } else {
                return res.status(500).json({ success: false, message: 'Status não permitido para a solicitação.' });
            }

            doc.save(function (error) {
                if (error) {
                    return res.status(500).json({ success: false, message: err });
                }

                return res.json({ success: true, data: doc });
            });
        } else {
            return res.status(500).json({ success: false, message: 'Solicitação não encontrada.' });
        }
    });
};

module.exports.countAlerts = function (req, res) {
    'use strict';

    return res.json({ estoque: 2, vendas: 1 });
};

module.exports.getAlerts = function (req, res) {
    'use strict';

    return res.json([
        {
            dataCriacao: new Date(),
            status: 'Pendente',
            totalProdutos: 4
        },
        {
            dataCriacao: new Date(),
            status: 'Pendente',
            totalProdutos: 8
        },
        {
            dataCriacao: new Date(),
            status: 'EmSeparacao',
            totalProdutos: 10
        }
    ]);
};

module.exports.countStatus = function (req, res) {
    'use strict';

    return res.json({
        rascunho: 2,
        pendente: 4,
        emSeparacao: 1,
        separada: 5
    });
};