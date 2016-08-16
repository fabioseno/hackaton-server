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
            user.data.nome = 'Fábio Akira Yoshida';
            user.data.lojaId = '0126';
            break;
        case '002':
            user.data.nome = 'Ana Paula Franciosi';
            user.data.lojaId = '0126';
            break;
        case '003':
            user.data.nome = 'Diógines Goldoni';
            user.data.lojaId = '0015';
            break;
        case '004':
            user.data.nome = 'Felipe Foliatti';
            user.data.lojaId = '0015';
            break;
        case '005':
            user.data.nome = 'Bruno XPTO';
            user.data.lojaId = '0001';
            break;
        case '006':
            user.data.nome = 'Cláudio Cezar';
            user.data.lojaId = '0001';
            break;
        default:
            return res.status(401).json({ success: false, message: 'Usuário ou senha inválidos!' });
        }

        return res.json(user);
    } else {
        return res.status(401).json({ success: false, message: 'Usuário ou senha inválidos!' });
    }
};