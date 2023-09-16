const dbPool = require('../db');



function checkAdmin(req, res, next) {
    dbPool.query('SELECT id FROM admin WHERE email = ? AND id= ? ', [req.userData.email,req.userData.userId], (error, results) => {

        if (error) {
            return res.status(250).json({ message: 'Error' });
        } else {
            if (results.length !== 1) {
                return res.status(250).json({ message: 'Access denied' });
            }
            next();
        }
    
        });
}

module.exports = {
    checkAdmin: checkAdmin
}