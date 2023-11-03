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





const addNewProduct = (req, res) => {
    const { name, description, unit_price, stock_quantity, id, volume } = req.body;
    if (id) {
        try {
            dbPool.query("UPDATE `product` SET `name`=?,title=? ,`description`=?, `unit_price`=?,price=?, `stock_quantity`=?,`volume`=? WHERE `id`=?", 
            [name, name,description, unit_price,unit_price, stock_quantity, volume, id], (error, results) => {
                if (error) {
                    return res.status(400).json({ message: "Can't edit product" });
                } else {
                    if (results.affectedRows == 0) {
                        return res.status(404).json({ error: true, message: "Product not found" });
                    } else {
                        return res.status(200).json({ error: false, message: "Product edited successfully" });
                    }
                }
            });
        } catch (error) {
            return res.status(500).json({ error: true, message: "Something went wrong!" });
        }
    } else {
        const newId = "PRO_" + generateId()
        try {
            dbPool.query("INSERT INTO `product`(`id`,`name`, `description`, `unit_price`, `stock_quantity`,`volume`,`title`,`price`) VALUES (?,?,?,?,?,?,?,?)", [newId, name, description, unit_price, stock_quantity, volume,name,unit_price], (error, results) => {
                if (error) {
                    return res.status(250).json({ error: true, message: "Can't Add" });
                } else {
                    return res.status(201).json({ error: false, message: "Product Added Sussessfully" });
                }
            })
        } catch (error) {
            return res.status(500).json({ error: true, message: "Something went wrong!" });
        }
    }

}




const deleteProduct = (req, res) => {
    const id = req.params.id; // Get the product ID from the URL parameters

    // Ensure that there's a product ID provided
    if (!id) {
        return res.status(400).json({ error: true, message: "Product ID is required to delete." });
    }

    try {
        dbPool.query("UPDATE `product` SET `isAvailable` = false WHERE `id` = ?", [id], (error, results) => {
            if (error) {
                return res.status(400).json({ message: "Can't delete product" });
            } else {
                if (results.affectedRows == 0) {
                    return res.status(404).json({ error: true, message: "Product not found" });
                } else {
                    return res.status(200).json({ error: false, message: "Product deleted successfully" });
                }
            }
        });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Something went wrong!" });
    }
}

const viewProductDetails = (req, res) => {
    const id = req.params.id; // Get the product ID from the URL parameters

    // Ensure that there's a product ID provided
    if (!id) {
        return res.status(400).json({ error: true, message: "Product ID is required to view details." });
    }

    try {
        dbPool.query("SELECT `name`, `description`, `unit_price`, `stock_quantity` FROM `product` WHERE `id` = ?", [id], (error, results) => {
            if (error) {
                return res.status(400).json({ message: "Can't fetch product details" });
            } else {
                if (results.length === 0) {
                    return res.status(404).json({ error: true, message: "Product not found" });
                } else {
                    return res.status(200).json(results[0]); // return the product details
                }
            }
        });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Something went wrong!" });
    }
}

const getAllProducts = (req, res) => {

    try {
        dbPool.query("SELECT *,CONCAT(DATE(product.created_at), ' ',TIME(product.created_at)) as time FROM `product` WHERE `isAvailable` = true", (error, results) => {
            if (error) {
                return res.status(400).json({ message: "Can't fetch product details" });
            } else {
                if (results.length === 0) {
                    return res.status(404).json({ error: true, message: "Product not found" });
                } else {
                    return res.status(200).json(results); // return the product details
                }
            }
        });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Something went wrong!" });
    }
}





function getProducts(req, res) {


    dbPool.query("SELECT * FROM product WHERE isAvailable=1 ",
        [], (error, results) => {
            if (error) {
                return res.status(250).json({ message: error });
            } else {
                return res.status(200).json({ results: results });
            }
        })
}


function insertOrders(req, res) {
    const newId = "ODR_" + generateId()
    const { quntity, product_id, store_id, route_id } = req.body;
    const sql = "INSERT INTO `order_product`(`id`, `quntity`, `product_id`, `user_id`, `store_id`, `route_id`) VALUES (?,?,?,?,?,?)"
    dbPool.query(sql,
        [newId, quntity, product_id, req.userData.userId, store_id, route_id], (error, results) => {
            if (error) {
                return res.status(250).json({ message: error });
            } else {
                return res.status(200).json({ message: "data Inserted Successfully" });
            }
        })
}



function getRouts(req, res) {
    const { store_id } = req.body;
    const sql = "SELECT * from route WHERE store_id=?"
    dbPool.query(sql,
        [store_id], (error, results) => {
            if (error) {
                return res.status(250).json({ message: error });
            } else {
                return res.status(200).json({ results: results });
            }
        })
}


module.exports = {
    addNewProduct,
    deleteProduct,
    viewProductDetails,
    getAllProducts,

    insertOrders,
    getProducts,
    getRouts
}




