const dbPool = require('../db');
const crypto = require('crypto');

const generateRandomString = (length) => {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
};

const generateId = () => {
    const timestamp = Date.now().toString();
    const randomString = generateRandomString(8); // Adjust the length as needed
    const combinedString = `${timestamp}${randomString}`;

    const hash = crypto.createHash('sha256');
    hash.update(combinedString);
    return hash.digest('hex');
};






function getAllOrders(req, res) {
    
    dbPool.query('SELECT *  FROM order_product WHERE processed = ?', [req.params.id], (error, results) => {
        if (error) {
            return res.status(250).json({ message: 'Error' });
        } else {
            return res.status(250).json({ results: results });
        }
    })
}








function addToTrain(req, res) {
    const { id, date, store_id } = req.body;

    dbPool.query("SELECT train.id as train_id,train.max_capacity as train_cap FROM store INNER JOIN train ON store.train_id=train.id WHERE store.id=?", [store_id], (error, results0) => {
        if (error) {
            return res.status(250).json({ message: error});
        } else {
            dbPool.query("SELECT order_product.quntity* product.volume as fullVolume FROM order_product  INNER JOIN product ON order_product.product_id = product.id WHERE order_product.id=?;", [id], (error, results) => {
                if (error) {
                    return res.status(250).json({ message: error });
                } else {
                    const constCurrentVol = parseFloat(results[0]['fullVolume'])
                    dbPool.query("SELECT SUM(train_trip.volume) as trainCurrentVol " +
                        "FROM order_product " +
                        "INNER JOIN product ON order_product.product_id = product.id " +
                        "INNER JOIN train_trip ON order_product.id = train_trip.order_product_id " +
                        "INNER JOIN train ON train_trip.train_id = train.id " +
                        "WHERE DATE(train_trip.date) = ? AND order_product.store_id =? AND train_trip.completed_status=0;", [date, store_id], (error, results2) => {
                            if (error) {
                                return res.status(250).json({ message: error });
                            } else {
                                const totalCapacity = constCurrentVol + parseFloat(results2[0].trainCurrentVol?results2[0].trainCurrentVol:0)
                               
                                if (totalCapacity <= parseFloat(results0[0].train_cap)) {
                                    // return res.status(200).json({ results2: results2, results: totalCapacity });
        
                                    dbPool.query("INSERT INTO `train_trip`(`order_product_id`, `completed_status`, `date`, `volume`, `train_id`) VALUES (?,?,?,?,?)", [id,0,date,constCurrentVol, results0[0].train_id], (error, results3) => {
                                        if (error) {
                                            return res.status(250).json({ message: "Can't Add" });
                                        } else {
                                          
                                            return res.status(201).json({ message: "Sussessfully added to Train" });
                                        }
                                    })
        
                                } else {
                                    return res.status(250).json({ message: "Train is full" });
                                }
                            }
                        });
        
                }
            })
        }})
}










function addRoute(req,res){
    const {name,maxTime,startTime,storeId} = req.body

    const id="ROUTE_"+generateId()
    dbPool.query("INSERT INTO `route`(`id`, `name`, `max_time`, `start_time`, `store_id`) VALUES (?,?,?,?,?)", [id,name,maxTime,startTime,storeId], (error, results) => {
        if (error) {
            return res.status(250).json({ message: "Can't Add" });
        } else {
            return res.status(201).json({ message: "Route Added Sussessfully" });
        }
    })
}





function getRoute(req,res){
    const {storeId} = req.body
    var sql="SELECT * FROM `route` INNER JOIN store ON store.id=route.store_id "
    if(storeId!==null){
        sql+="WHERE store.id='"+storeId+"'"
    }
     console.log(sql)
    dbPool.query(sql,[] , (error, results) => {
        if (error) {
            return res.status(250).json({ message: error });
        } else {
            return res.status(201).json({ results:results});
        }
    })
}


function deleteRoute(req,res){
    const {id} = req.body
   
    dbPool.query("DELETE FROM `route` WHERE id=?",[id] , (error, results) => {
        if (error) {
            return res.status(250).json({ message: error });
        } else {
            return res.status(201).json({ message:"Deleted Successfully"});
        }
    })
}





module.exports = {
    getAllOrders,
    addToTrain,


    addRoute,
    getRoute,
    deleteRoute,
} 