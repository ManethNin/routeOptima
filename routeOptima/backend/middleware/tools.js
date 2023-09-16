
const crypto = require('crypto');

const generateRandomString = (length) => {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
};

// Function to generate a unique user ID using timestamp and random string
const generateId = (length) => {
    const timestamp = Date.now().toString();
    const randomString = generateRandomString(length); // Adjust the length as needed
    const combinedString = `${timestamp}${randomString}`;

    return combinedString;
};



module.exports = {
    generateId: generateId,
} 