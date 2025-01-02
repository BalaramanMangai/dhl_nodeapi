const express = require('express');


const productController = require('../controllers/productController');
const validateProduct = require('../middleware/validateProduct');
const router = express.Router();

// Route to add a new member
router.post('/addProduct', validateProduct, productController.addProduct);
router.get('/getProduct', productController.getProduct);
router.post('/updateProduct', validateProduct, productController.updateProduct);
router.get('/saleList', productController.saleList);
router.post('/deleteSale', productController.deleteSale);
module.exports = router;

