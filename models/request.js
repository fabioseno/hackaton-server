/*global require, module*/
var mongoose = require('mongoose'),

    requestSchema = new mongoose.Schema({
        dataCriacao: {
            required: true,
            type: Date
        },
        usuarioCriacao: {
            required: true,
            type: String,
            trim: true
        },
        dataPendente: {
            type: Date
        },
        usuarioPendente: {
            type: String,
            trim: true
        },
        dataEmSeparacao: {
            type: Date
        },
        usuarioEmSeparacao: {
            type: String,
            trim: true
        },
        dataSeparada: {
            type: Date
        },
        usuarioSeparada: {
            type: String,
            trim: true
        },
        dataFinalizacao: {
            type: Date
        },
        usuarioFinalizacao: {
            type: String,
            trim: true
        },
        tipo: { // automatica ou manual
            required: true,
            type: String
        },
        storeId: {
            required: true,
            type: Number,
            trim: true
        },
        _id: { type: mongoose.Schema.ObjectId }
    });

module.exports = mongoose.model('Request', requestSchema);