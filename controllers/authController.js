const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });
        if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

        const token = jwt.sign({ userId: user.id }, 'secret_key', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
