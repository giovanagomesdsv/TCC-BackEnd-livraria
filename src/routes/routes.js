const express = require('express');
const router = express.Router();

const RotasGiovana = require('./routes-giovana'); 
const RotasMariana = require('./routes-mariana'); 
const RotasAnna = require('./routes-anna'); 
const RotasHenrique = require('./routes henrique'); 
const RotasCleverson = require('./routes-cleverson'); 

router.use('/', RotasGiovana);
router.use('/', RotasMariana);
router.use('/', RotasCleverson);
router.use('/', RotasAnna);
router.use('/', RotasHenrique);

module.exports = router;
