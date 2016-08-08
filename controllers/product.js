/*global module*/
module.exports.getProduct = function (req, res) {
    'use strict';

    return res.json({ id: 123, sku: 456, name: 'Product 1' });
};

module.exports.getSKU = function (req, res) {
    'use strict';

    return res.json({ id: 234, sku: 456, name: 'SKU 1' });
};

module.exports.getPrice = function (req, res) {
    'use strict';

    return res.json({ sku: 123, price: 123.34 });
};

module.exports.getOutOfStock = function (req, res) {
    'use strict';

    return res.json({ sku: 123, price: 123.34 });
};