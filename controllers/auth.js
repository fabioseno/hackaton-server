/*global module*/
module.exports.login = function (req, res) {
    'use strict';

    var user = {
        success: true,
        data: {
            nome: 'Fábio Akira Yoshida',
            lojaId: '0126'
        }
    };

    if (req.body.chapa === req.body.senha) {
        switch (req.body.chapa) {
        case '001':
            user.data = 'Fábio Akira Yoshida';
            break;
        case '002':
            user.data = 'Ana Paula Franciosi';
            break;
        case '003':
            user.data = 'Diógines Goldoni';
            break;
        case '004':
            user.data = 'Felipe Foliatti';
            break;
        case '005':
            user.data = 'Bruno XPTO';
            break;
        case '006':
            user.data = 'Cláudio Cezar';
            break;
        default:
            return res.status(401).json({ success: false, message: 'Usuário ou senha inválidos!' });
        }

        return res.json(user);
    } else {
        return res.status(401).json({ success: false, message: 'Usuário ou senha inválidos!' });
    }
};