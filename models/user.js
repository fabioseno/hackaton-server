/*global require, module*/
var mongoose = require('mongoose'),

    userSchema = new mongoose.Schema({
        chapa: {
            required: true,
            type: String,
            trim: true
        },
        senha: {
            required: true,
            type: String,
            trim: true
        },
        codigoLoja: {
            required: true,
            type: Number,
            trim: true
        },
        _id: { type: mongoose.Schema.ObjectId }
    });

module.exports = mongoose.model('User', userSchema);