const express = require('express');
const userController = require('../controllers/user.controller');

const checkAuth = require('../middleware/check-auth');

const orderController=require('../controllers/order.controller');


const router = express.Router();

// product manager 
router.get('/order/:id', checkAuth.checkAuth,orderController.getAllOrders);
router.post('/add-to-train', checkAuth.checkAuth,orderController.addToTrain);


// route manager 
router.post('/add-route', checkAuth.checkAuth,orderController.addRoute);
router.post('/get-route', checkAuth.checkAuth,orderController.getRoute);
router.delete('/route', checkAuth.checkAuth,orderController.deleteRoute);


// store manager 
router.post('/order-by-store', checkAuth.checkAuth,orderController.getOrdersByStore);
router.post('/mark-as-shipped', checkAuth.checkAuth,orderController.markAsShipped);


module.exports = router;