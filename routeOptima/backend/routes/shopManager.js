const express = require('express');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

const shopController = require('../controllers/shop.controller');
 
router.post('/addproduct', checkAuth.checkAuth, shopController.addNewProduct);
router.put('/deleteproduct/:id', checkAuth.checkAuth, shopController.deleteProduct);
router.get('/viewproduct/:id', checkAuth.checkAuth,  shopController.viewProductDetails);
router.get('/getallproducts',checkAuth.checkAuth,  shopController.getAllProducts);

module.exports = router; 