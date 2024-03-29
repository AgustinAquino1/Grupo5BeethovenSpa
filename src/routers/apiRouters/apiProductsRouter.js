const express = require('express');
const router = express.Router();
const apiProductsController = require('../../controllers/apiControllers/apiProductsController');


router.get('/products', apiProductsController.list);
router.get('/products/:id', apiProductsController.detail);

module.exports = router;