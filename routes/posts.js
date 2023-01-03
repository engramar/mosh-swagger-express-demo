const express = require('express');
const router = express.Router();
const Joi = require('joi');

router.get('/:year/:month', (req, res) => {
    res.send(req.params);
});

module.exports = router;