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
router.post('/order-by-store', checkAuth.checkAuth,orderController.getOrdersByStore);   //get orders by store id
router.post('/mark-as-shipped', checkAuth.checkAuth,orderController.markAsShipped);


// delivery manager 
router.post('/schedule', checkAuth.checkAuth,orderController.addUpdateTruckSchedule); 
router.get('/schedule', checkAuth.checkAuth,orderController.getTruckSchedule);   
router.delete('/schedule', checkAuth.checkAuth,orderController.deleteTruckSchedule);   

router.post('/schedule/route', checkAuth.checkAuth,orderController.scheduleRouts);  
router.post('/schedule/truck', checkAuth.checkAuth,orderController.scheduleTrucks);


router.get('/schedule/:date', checkAuth.checkAuth,orderController.getTruckSchedule); //  get schedules


router.post('/peinding-delivery/', checkAuth.checkAuth,orderController.getPendingDelivery);  
// router.post('/get-available-schedules', checkAuth.checkAuth,orderController.getAvailableSchedules);  
router.post('/add-dilivery', checkAuth.checkAuth,orderController.addDeliveryToTruck);  
router.post('/remove-dilivery', checkAuth.checkAuth,orderController.removeDeliveryFromTruck);  

module.exports = router;