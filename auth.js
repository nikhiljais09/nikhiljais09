const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db');
const router = express.Router();

router.post('/signup', (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err, results) => {
        if (err) return res.status(500).send('Error registering user.');
        res.status(200).send('User registered successfully.');
    });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err || results.length === 0) return res.status(404).send('User not found.');

        const user = results[0];
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) return res.status(401).send('Invalid credentials.');

        const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
        res.status(200).send({ auth: true, token });
    });
});

module.exports = router;
