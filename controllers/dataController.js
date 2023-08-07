const express = require('express');
const router = express.Router();
const { DataEntry } = require('../models');
const verifyToken = require('../middlewares/verifyToken');


router.post('/', verifyToken, async (req, res) => {
    try {
        const data = await DataEntry.create({ ...req.body, userId: req.user.userId });
        res.status(201).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/:key', verifyToken, async (req, res) => {
    try {
        const data = await DataEntry.findOne({
        where: { key: req.params.key, userId: req.user.userId },
    });
    if (!data) {
        return res.status(404).json({ error: 'Key not found' });
    }
    res.json(data);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:key', verifyToken, async (req, res) => {
    try {
        const [updatedCount, updatedData] = await DataEntry.update(req.body, {
        where: { key: req.params.key, userId: req.user.userId },
        returning: true,
    });
    if (updatedCount === 0) {
        return res.status(404).json({ error: 'Key not found' });
    }
    res.json(updatedData[0]);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:key', verifyToken, async (req, res) => {
    try {
        const deletedCount = await DataEntry.destroy({
        where: { key: req.params.key, userId: req.user.userId },
    });
    if (deletedCount === 0) {
        return res.status(404).json({ error: 'Key not found' });
    }
        res.json({ message: 'Data deleted successfully' });
    } catch (error) {
    res.status(400).json({ error: error.message });
    }
});

module.exports = router;