
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dbPool = require('../db');
const crypto = require('crypto');





// Function to generate a random string
const generateRandomString = (length) => {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
};

// Function to generate a unique user ID using timestamp and random string
const generateUserId = () => {
    const timestamp = Date.now().toString();
    const randomString = generateRandomString(8); // Adjust the length as needed
    const combinedString = `${timestamp}${randomString}`;

    const hash = crypto.createHash('sha256');
    hash.update(combinedString);
    return hash.digest('hex');
};




function signUp(req, res) {
    //Sign up

    const { firstName, lastName, email, password, address, country, role, store } = req.body;

    dbPool.query('SELECT id FROM user WHERE email = ?', [email], (error, results) => {

        if (error) {
            return res.status(250).json({ message: 'Error' });
        } else {
            if (results.length > 0) {
                return res.status(250).json({ message: 'Email alrady exist' });
            }

            const userId = generateUserId();

            bcryptjs.genSalt(10, function (err, salt) {
                bcryptjs.hash(req.body.password, salt, function (err, hash) {

                    const sql = "INSERT INTO `user`(`id`, `password`, `address`, `email`, " +
                        "`country`, `role`, `first_name`, `last_name`, `store_id`) " +
                        "VALUES (?,?,?,?,?,?,?,?,?)";


                    dbPool.query(sql, [userId, hash, address, email, country, role, firstName, lastName, store], (error, results) => {
                        if (error) {
                            // console.error(error);
                            return res.status(250).json({ message: 'Error creating', error: error });
                        } else {
                            res.status(201).json({ message: 'User created successfully' });
                        }
                    });

                });
            });
        }
    });

}











function login(req, res) {

    const { email, password } = req.body;

    try {
        dbPool.query('SELECT password,id,email,role,store_id FROM user WHERE email = ?', [email], (error, results) => {
            // return res.status(200).json({ results: results });
            if (error) {
                return res.status(250).json({ message: 'Error', error: error });
            } else {
                if (results.length == 1) {
                    return bcryptjs.compare(password, results[0].password, function (err, result) {
                        if (result) {
                            const token = jwt.sign({
                                email: results[0].email,
                                userId: results[0].id,
                                role: results[0].role,
                                store: results[0].store_id

                            }, process.env.JWT_KEY, function (err, token) {
                                return res.status(200).json({
                                    message: "Authentication successful!",
                                    token: token,
                                    status: results[0].status,
                                    role: results[0].role,
                                    store: results[0].store_id
                                });
                            });
                        } else {
                            return res.status(250).json({
                                message: "Invalid credentials!",
                            });
                        }
                    });
                }


                // admin check
                return dbPool.query('SELECT * FROM admin WHERE email = ?', [email], (error, resultsAdmin) => {
                    // return res.status(200).json({ results: results });
                    if (error) {
                        return res.status(250).json({ message: 'Error' });
                    } else {
                        if (resultsAdmin.length == 1) {
                            if (password === resultsAdmin[0].password) {
                                const token = jwt.sign({
                                    email: resultsAdmin[0].email,
                                    userId: resultsAdmin[0].id,
                                    role: resultsAdmin[0].role
                                }, process.env.JWT_KEY, function (err, token) {
                                    return res.status(200).json({
                                        message: "Authentication successful(admin)!",
                                        token: token,
                                        role: resultsAdmin[0].role,
                                        status: 1,
                                    });
                                });

                                return token;
                            }
                        }
                        return res.status(250).json({ message: "Invalid credentials!" });
                    }


                });
            }
        });


    } catch (err) {
        // console.error(err);
        return res.status(250).json({ error: 'An error occurred during login' });
    }


}




function getUsers(req, res) {
    const { start, end,status } = req.body;
    const sql="SELECT `id`, `email`, `first_name`, `last_name`, `address`, `country`, `role`,`store_id` FROM `user` WHERE status= ? AND role BETWEEN ? and ?  ORDER BY role ASC "
    dbPool.query(sql, [status,start,end], (error, results) => {
        if (error) {
            return res.status(250).json({ message: error });
        } else {
            return res.status(200).json({ results: results });
        }
    })
}




function acceptUsers(req,res){
    const { id } = req.body;
    dbPool.query("UPDATE `user` SET `status`=1 WHERE id=?", [id], (error, results) => {
        if (error) {
            return res.status(250).json({ message: error });
        } else {
            return res.status(201).json({ message: "Updated" });
        }
    })
}



function deleteUsers(req,res){
    const { id } = req.body;
    dbPool.query("DELETE FROM `user` WHERE id=?", [id], (error, results) => {
        if (error) {
            return res.status(250).json({ message: error });
        } else {
            return res.status(201).json({ message: "User Deleted" });
        }
    })
}






module.exports = {
    signUp: signUp,
    login: login,

    getUsers,
    acceptUsers,
    deleteUsers


    
} 