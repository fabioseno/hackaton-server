/*global require, module*/
var mongoose = require('mongoose'),

    skuSchema = mongoose.Schema({
        codigoProduto : String,
        sku  : {
            required: true,
            type: String
        },
        quantidade : {
            required: true,
            type: Number
        },
        separado: Number
    }),

    requestSchema = mongoose.Schema({
        tipo: { // automatica ou manual
            required: true,
            type: String
        },
        prioridade: {
            required: true,
            type: Number
        },
        status: {
            required: true,
            type: String
        },
        lojaId: {
            required: true,
            type: Number,
            trim: true
        },
        dataCriacao: {
            required: true,
            type: Date,
            default: Date.now
        },
        dataPendente: {
            type: Date
        },
        dataEmSeparacao: {
            type: Date
        },
        dataSeparada: {
            type: Date
        },
        dataFinalizacao: {
            type: Date
        },
        usuarioCriacao: {
            required: true,
            type: String,
            trim: true
        },
        usuarioEmSeparacao: {
            type: String,
            trim: true
        },
        produtos: [skuSchema]
    });

requestSchema.virtual('id').get(function () {
    'use strict';

    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
skuSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret, options) {
        'use strict';

        var result = {
            codigoProduto: ret.codigoProduto,
            sku: ret.sku,
            quantidade: ret.quantidade,
            separado: ret.separado
        };

        return result;
    }
});

requestSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret, options) {
        'use strict';

        var result = {
            id: ret.id,
            tipo: ret.tipo,
            prioridade: ret.prioridade,
            status: ret.status,
            lojaId: ret.lojaId,
            dataCriacao: ret.dataCriacao,
            dataPendente: ret.dataPendente,
            dataEmSeparacao: ret.dataEmSeparacao,
            dataSeparada: ret.dataSeparada,
            dataFinalizacao: ret.dataFinalizacao,
            usuarioCriacao: ret.usuarioCriacao,
            usuarioEmSeparacao: ret.usuarioEmSeparacao,
            produtos: ret.produtos
        };

        return result;
    }
});

module.exports = mongoose.model('Request', requestSchema);