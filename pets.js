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

// Get all pets
router.get('/', authenticateToken, (req, res) => {
    db.query('SELECT * FROM pets', (err, results) => {
        if (err) return res.status(500).send('Error fetching pets.');
        res.status(200).send(results);
    });
});

module.exports = router;
