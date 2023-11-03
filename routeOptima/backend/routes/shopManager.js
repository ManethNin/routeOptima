const express = require('express');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

const shopController = require('../controllers/shop.controller');
 
router.post('/addproduct', checkAuth.checkAuth, shopController.addNewProduct);
router.put('/deleteproduct/:id', checkAuth.checkAuth, shopController.deleteProduct);
router.get('/viewproduct/:id', checkAuth.checkAuth,  shopController.viewProductDetails);
router.get('/getallproducts',checkAuth.checkAuth,  shopController.getAllProducts);


// customer 
router.get('/get-all-products', shopController.getProducts);
router.post('/place-order', checkAuth.checkAuth, shopController.insertOrders);
router.post('/get-routs', checkAuth.checkAuth, shopController.getRouts);

module.exports = router; 