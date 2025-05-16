const express = require('express'); 
const router = express.Router(); 

const RotasGiovana = require('routes-giovana.js'); 

router.use('/', RotasGiovana);


module.exports = router;