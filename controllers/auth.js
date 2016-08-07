/*global module*/
module.exports.login = function (req, res) {
    'use strict';

    if ((req.body.chapa === '001' || req.body.chapa === '002' || req.body.chapa === '003')
            && req.body.chapa === req.body.senha) {
        return res.json({
            sucess: true,
            data: {
                nome: 'Fábio Akira Yoshida',
                lojaId: '0126'
            }
        });
    } else {
        return res.status(401).json({ success: false, message: 'Usuário ou senha inválidos!' });
    }
};