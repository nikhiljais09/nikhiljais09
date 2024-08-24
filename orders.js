const express = require('express');
const db = require('./db');
const router = express.Router();

// Middleware for authentication
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (!token) return res.status(401).send('Access Denied');
    
    jwt.verify(token, 'secret', (err, user) => {
        if (err) return res.status(403).send('Invalid Token');
        req.user = user;
        next();
    });
}

// Place an order
router.post('/', authenticateToken, (req, res) => {
    const { petId, buyerName, buyerAddress } = req.body;

    db.query('INSERT INTO orders (pet_id, buyer_name, buyer_address) VALUES (?, ?, ?)', 
    [petId, buyerName, buyerAddress], (err, results) => {
        if (err) return res.status(500).send('Error placing order.');
        res.status(200).send('Order placed successfully.');
    });
});

module.exports = router;
