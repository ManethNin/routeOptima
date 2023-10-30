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

    dbPool.query('SELECT o.id,o.shipped as shipped,o.quntity ,o.order_date,s.distination,u.first_name,s.id as store_id,o.product_id as product_id FROM order_product as o   INNER JOIN store as s ON s.id=o.store_id INNER JOIN user as u ON u.id=o.user_id WHERE processed = ?', [req.params.id], (error, results) => {
        if (error) {
            return res.status(250).json({ message: "Delete failed" });
        } else {
            return res.status(200).json({ results: results });
        }
    })
}








function addToTrain(req, res) {
    const { id, date, store_id } = req.body;

    dbPool.query("SELECT train.id as train_id,train.max_capacity as train_cap FROM store INNER JOIN train ON store.train_id=train.id WHERE store.id=?", [store_id], (error, results0) => {
        if (error) {
            return res.status(250).json({ message: error });
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
                                const totalCapacity = constCurrentVol + parseFloat(results2[0].trainCurrentVol ? results2[0].trainCurrentVol : 0)

                                if (totalCapacity <= parseFloat(results0[0].train_cap)) {
                                    // return res.status(200).json({ results2: results2, results: totalCapacity });

                                    dbPool.query("INSERT INTO `train_trip`(`order_product_id`, `completed_status`, `date`, `volume`, `train_id`) VALUES (?,?,?,?,?)", [id, 0, date, constCurrentVol, results0[0].train_id], (error, results3) => {
                                        if (error) {
                                            return res.status(250).json({ message: error });
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
        }
    })
}










function addRoute(req, res) {
    const { name, maxTime, startTime, storeId, id } = req.body

    if (id) {
        dbPool.query("UPDATE `route` SET `name`=?,`max_time`=?,`start_time`=?,`store_id`=? WHERE id=?",
            [name, maxTime, startTime, storeId, id], (error, results) => {
                if (error) {
                    return res.status(250).json({ message: 'Error' });
                } else {
                    return res.status(201).json({ message: "Changes Applied" });
                }
            })
    } else {
        const idNew = "ROUTE_" + generateId()
        dbPool.query("INSERT INTO `route`(`id`, `name`, `max_time`, `start_time`, `store_id`) VALUES (?,?,?,?,?)", [idNew, name, maxTime, startTime, storeId], (error, results) => {
            if (error) {
                return res.status(250).json({ message: "Can't Add" });
            } else {
                return res.status(201).json({ message: "Route Added Sussessfully" });
            }
        })
    }

}





function getRoute(req, res) {
    const { storeId } = req.body
    var sql = "SELECT * FROM `route` "
    if (storeId !== null) {
        sql += "WHERE store_id='" + storeId + "'"
    }
    console.log(sql)
    dbPool.query(sql, [], (error, results) => {
        if (error) {
            return res.status(250).json({ message: error });
        } else {
            return res.status(201).json({ results: results });
        }
    })
}


function deleteRoute(req, res) {
    const { id } = req.body

    dbPool.query("DELETE FROM `route` WHERE id=?", [id], (error, results) => {
        if (error) {
            return res.status(250).json({ message: error });
        } else {
            return res.status(201).json({ message: "Deleted Successfully" });
        }
    })
}




// store manager 
function getOrdersByStore(req, res) {
    const { shipped, store, completed } = req.body;

    dbPool.query('SELECT o.id,o.quntity ,o.quntity*p.volume as volume ,o.order_date,u.first_name,p.name as product_name FROM order_product as o   INNER JOIN product as p ON p.id=o.product_id INNER JOIN user as u ON u.id=o.user_id WHERE processed = 1 AND o.store_id=? AND o.shipped=? AND o.completd=?', [store, shipped, completed], (error, results) => {
        if (error) {
            return res.status(250).json({ message: error });
        } else {
            return res.status(200).json({ results: results });
        }
    })
}


function markAsShipped(req, res) {
    const { id } = req.body;

    dbPool.query("UPDATE `train_trip` SET `completed_status`=1 WHERE order_product_id=?", [id], (error, results) => {
        if (error) {
            return res.status(250).json({ message: 'Error' });
        } else {
            return res.status(201).json({ message: "Mark As Shipped" });
        }
    })
}









// delivery manager 
function addUpdateTruckSchedule(req, res) {
    const { date, routeId, truckId, driverId, assitantId, id } = req.body
    if (id) {
        dbPool.query("UPDATE `truck_schedule` SET `truck_id`=?,`driver_user_id`=?,`assistant_user_id`=?,`route_id`=?,`time`=? WHERE id=?",
            [truckId, driverId, assitantId, routeId, date, id], (error, results) => {
                if (error) {
                    return res.status(250).json({ message: 'Error' });
                } else {
                    return res.status(201).json({ message: "Changes Applied" });
                }
            })
    } else {



        const idNew = "SCHEDULE_" + generateId();


        dbPool.query("INSERT INTO `truck_schedule`(`id`, `truck_id`, `driver_user_id`, `assistant_user_id`,`route_id`, `time`) VALUES (?,?,?,?,?,?)",
            [idNew, truckId, driverId, assitantId, routeId, date], (error, results) => {
                if (error) {
                    return res.status(250).json({ message: 'Error' });
                } else {
                    return res.status(201).json({ message: "Successflly Created" });
                }
            })


    }
}





function getTruckSchedule(req, res) {
    dbPool.query("SELECT * FROM truck_schedule WHERE date > NOW();",
        [], (error, results) => {
            if (error) {
                return res.status(250).json({ message: 'Error' });
            } else {
                return res.status(200).json({ results: results });
            }
        })
}


function deleteTruckSchedule(req, res) {
    dbPool.query("DELETE FROM `truck_schedule` WHERE id=?",
        [req.body.id], (error, results) => {
            if (error) {
                return res.status(250).json({ message: 'Error' });
            } else {
                return res.status(200).json({ message: "Successfully removed" });
            }
        })
}



function scheduleRouts(req, res) {
    dbPool.query("SELECT * FROM route WHERE store_id=?",
        [req.body.storeId], (error, results) => {
            if (error) {
                return res.status(250).json({ message: 'Error' });
            } else {
                return res.status(200).json({ results: results });
            }
        })
}







function scheduleTrucks(req, res) {
    const { startTime, storeId, routeId } = req.body
    dbPool.query("SELECT max_time FROM route WHERE id=?",
        [req.body.routeId], (error, results) => {
            if (error) {
                return res.status(250).json({ message: 'Error' });
            } else {
                const maxTime = results[0].max_time
                const sql = "SELECT ts.truck_id, ts.driver_user_id, ts.assistant_user_id,ts.time " +
                    "FROM truck_schedule ts " +
                    "JOIN route r ON ts.route_id = r.id " +
                    "WHERE " +
                    "? BETWEEN ts.`time` AND ADDTIME(ts.`time`, r.max_time) OR " +
                    "ADDTIME(?, ?) BETWEEN ts.`time` AND ADDTIME(ts.`time`, r.max_time) OR " +
                    "(? <= ts.`time` AND (ADDTIME(?, ?)) >= ADDTIME(ts.`time`, r.max_time))"
                dbPool.query(
                    sql,
                    [startTime, startTime, maxTime, startTime, startTime, maxTime],
                    (error, results2) => {
                        if (error) {
                            return res.status(250).json({ message: error, results: sql });
                        } else {
                            const truckIds = results2.map(result => result.truck_id).join("','");

                            const response = {};

                            // Create a Promise for the first database query
                            const query1Promise = new Promise((resolve, reject) => {
                                dbPool.query("SELECT * FROM truck WHERE store_id=? AND id NOT IN('" + truckIds + "')",
                                    [storeId], (error, results3) => {
                                        if (error) {
                                            reject('Error in the first query');
                                        } else {
                                            response['truckData'] = results3;
                                            resolve();
                                        }
                                    });
                            });

                            const date2 = startTime.match(/\d{4}\.\d{2}\.\d{2}/)[0];
                            const query2Promise = new Promise((resolve, reject) => {
                                dbPool.query(
                                    "SELECT u.id, d.work_hours FROM truck_schedule AS ts " +
                                    "RIGHT JOIN user AS u ON u.id = ts.driver_user_id " +
                                    "LEFT JOIN driver AS d ON d.user_id = u.id " +
                                    "WHERE (DATE(ts.time) != ? OR ts.time IS NULL) " +
                                    "AND u.role = 5 AND u.status = 1 AND " +
                                    "(d.work_hours + ? <= 40 OR d.work_hours IS NULL)",
                                    [date2, maxTime],
                                    (error, results3) => {
                                        if (error) {
                                            resolve();
                                        } else {
                                            // response['drivers'] = results3;
                                            resolve();
                                        }
                                    }
                                );
                            });

                            const query3Promise = new Promise((resolve, reject) => {
                                dbPool.query(
                                    "SELECT assistant_user_id FROM truck_schedule WHERE DATE(`time`) = ?  GROUP BY assistant_user_id HAVING COUNT(id) >2",
                                    [date2],
                                    (error, results3) => {
                                        if (error) {
                                            resolve();
                                        } else {
                                            const assIds = results3.map(result => result.assistant_user_id).join("','");

                                            dbPool.query(
                                                "SELECT u.id, a.work_hours from user as u LEFT JOIN assistant as a  ON a.user_id=u.id WHERE u.id NOT IN('" + assIds + "') AND u.role=6 AND u.status=1 AND (a.work_hours + ? <= 60 OR a.work_hours IS NULL)",
                                                [maxTime],
                                                (error, results4) => {
                                                    if (error) {
                                                        resolve();
                                                    } else {
                                                        response['assistant'] = results4;
                                                        resolve();

                                                    }
                                                }
                                            );
                                        }
                                    }
                                );
                            });


                            Promise.all([query1Promise, query2Promise, query3Promise])
                                .then(() => {
                                    res.status(200).json(response);
                                })
                                .catch((error) => {
                                    res.status(250).json({ message: error });
                                });

                        }
                    }
                );
            }
        })

}








module.exports = {
    getAllOrders,
    addToTrain,


    addRoute,
    getRoute,
    deleteRoute,


    getOrdersByStore,
    markAsShipped,




    addUpdateTruckSchedule,
    getTruckSchedule,
    deleteTruckSchedule,

    scheduleRouts,
    scheduleTrucks,

} 