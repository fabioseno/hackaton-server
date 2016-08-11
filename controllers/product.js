/*global module*/
module.exports.getProduct = function (req, res) {
    'use strict';

    var product = {  
        "contexto":{  
            "sucesso":true
        },
        "codigoProduto":"535977248",
        "nome":"Pijama Infantil com Estampa de Dinossauro - Tam 2 a 12 anos",
        "tipoProduto":"APPAREL",
        "cor":{  
            "codigo":"535977248-5V",
            "nome":"Marrom",
            "fotosGrandes":[  
                "//largeimg.lojasrenner.com.br/images/variant/large/535977248-5V_z_1.jpg"
            ],
            "fotosPequenas":[  
                "/images/variant/icon/535977248-5V_v_1.jpg",
                "//iconimg.lojasrenner.com.br/images/variant/icon/535977248-5V_v_2.jpg"
            ],
            "fotoPantone":"//colorimg.lojasrenner.com.br/images/variant/imagecolors/535977248-5V.jpg"
        },
        "tamanho":{  
            "codigo":"6A",
            "nome":"6A"
        },
        "sku":"535977281",
        "categoriaEcommerce":[  
            {  
                "codigo":"cat180002",
                "nome":"AllCategories",
                "codigosPais":[  

                ]
            },
            {  
                "codigo":"cat30004",
                "nome":"Infantil",
                "codigosPais":[  
                    "cat180002"
                ]
            },
            {  
                "codigo":"cat130005",
                "nome":"Pijamas e Roupa Íntima",
                "codigosPais":[  
                    "cat30004"
                ]
            },
            {  
                "codigo":"cat1830679",
                "nome":"Pijamas",
                "codigosPais":[  
                    "cat130005"
                ]
            }
        ],
        "categoriaRetail":{  
            "grupo":{  
                "codigo":"321",
                "nome":"R_I_AcesInfantil"
            },
            "departamento":{  
                "codigo":"4089",
                "nome":"R_I_AcesInfantil_O"
            },
            "classe":{  
                "codigo":"5238",
                "nome":"Pijama"
            },
            "subclasse":{  
                "codigo":"6368"
            }
        },
        "cores":[  
            {  
                "codigo":"535977248-5V",
                "nome":"Marrom",
                "fotosGrandes":[  
                    "//largeimg.lojasrenner.com.br/images/variant/large/535977248-5V_z_1.jpg"
                ],
                "fotosPequenas":[  
                    "/images/variant/icon/535977248-5V_v_1.jpg",
                    "//iconimg.lojasrenner.com.br/images/variant/icon/535977248-5V_v_2.jpg"
                ],
                "fotoPantone":"//colorimg.lojasrenner.com.br/images/variant/imagecolors/535977248-5V.jpg"
            }
        ],
        "tamanhos":[  
            {  
                "codigo":"2A",
                "nome":"2A"
            },
            {  
                "codigo":"4A",
                "nome":"4A"
            },
            {  
                "codigo":"6A",
                "nome":"6A"
            },
            {  
                "codigo":"8A",
                "nome":"8A"
            },
            {  
                "codigo":"10A",
                "nome":"10A"
            },
            {  
                "codigo":"12A",
                "nome":"12A"
            }
        ],
        "skus":{  
            "535977264":{  
                "codigoCor":"5V",
                "codigoTamanho":"2A"
            },
            "535977272":{  
                "codigoCor":"5V",
                "codigoTamanho":"4A"
            },
            "535977281":{  
                "codigoCor":"5V",
                "codigoTamanho":"6A"
            },
            "535977299":{  
                "codigoCor":"5V",
                "codigoTamanho":"8A"
            },
            "535977301":{  
                "codigoCor":"5V",
                "codigoTamanho":"10A"
            },
            "535977310":{  
                "codigoCor":"5V",
                "codigoTamanho":"12A"
            }
        },
        "manipulado":true
    };

    product.codigoProduto = req.params.codigo;

    return res.json(product);
};

module.exports.getSKU = function (req, res) {
    'use strict';

    return res.json({ nome: 'falta obter um json mockado para sku.' });
};

module.exports.getPrice = function (req, res) {
    'use strict';

    return res.json({ price: 123.34 });
};

module.exports.getOutOfStock = function (req, res) {
    'use strict';

    return res.json({ sku: 123, price: 123.34 });
};