const express = require('express');
const router = express.Router();

const RotasGiovana = require('./routes-giovana'); 

router.use('/', RotasGiovana);

module.exports = router;
