const jwt = require('jsonwebtoken');
const JWT_SECRET = '123123321@ghi!'; 

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    console.log('Received Token:', token);

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    const bearerToken = token.split(' ')[1];
    console.log('Bearer Token:', bearerToken);

    if (!bearerToken) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(bearerToken, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }
        console.log('Decoded:', decoded);
        req.userId = decoded.id;

        next();
    });
};

module.exports = verifyToken;
