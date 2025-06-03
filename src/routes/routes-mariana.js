const express = require('express'); 
const router = express.Router(); 

const autoresController = require('../controllers/autores'); 
const generosController = require('../controllers/generos'); 

router.get('/autores', autoresController.listarAutores); 
router.post('/autores', autoresController.cadastrarAutores); 
router.patch('/autores/:id', autoresController.editarAutores); 
router.delete('/autores/:id', autoresController.apagarAutores); 

router.get('/generos', generosController.listarGeneros); 
router.post('/generos', generosController.cadastrarGeneros); 
router.patch('/generos/:id', generosController.editarGeneros); 
router.delete('/generos/:id', generosController.apagarGeneros); 



module.exports = router;