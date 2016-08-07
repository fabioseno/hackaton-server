/*global module*/
module.exports.searchRequest = function (req, res) {
    'use strict';

    return res.json({ id: 123, sku: 456, name: 'Product 1' });
};

module.exports.getRequest = function (req, res) {
    'use strict';

    return res.json({ id: 123, sku: 456, name: 'Product 1' });
};

module.exports.addRequest = function (req, res) {
    'use strict';

    return res.json({ id: 123, sku: 456, name: 'Product 1' });
};

module.exports.generateAuto = function (req, res) {
    'use strict';

    return res.json({ sku: 123, price: 123.34 });
};

module.exports.deleteRequest = function (req, res) {
    'use strict';

    // must be draft
    
    return res.json({ id: 234, sku: 456, name: 'SKU 1' });
};

module.exports.deleteAll = function (req, res) {
    'use strict';

    return res.json({ sku: 123, price: 123.34 });
};

module.exports.saveProduct = function (req, res) {
    'use strict';

    // must be draft
    
    return res.json({ id: 234, sku: 456, name: 'SKU 1' });
};

module.exports.removeProduct = function (req, res) {
    'use strict';

    // must be draft
    
    return res.json({ id: 234, sku: 456, name: 'SKU 1' });
};

//module.exports.updateProductQuantity = function (req, res) {
//    'use strict';
//
//    return res.json({ sku: 123, price: 123.34 });
//};

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