const express = require('express'); 
const router = express.Router(); 

const AutoresController = require('../controllers/livrosAutores');
const GenerosController = require('../controllers/livrosGeneros');  

router.get('/livrosAutores', AutoresController.listarLivroAutores); 
router.post('/livrosAutores', AutoresController.cadastrarLivroAutores); 
router.patch('/livrosAutores/:aut_id', AutoresController.editarLivroAutores); //params
router.delete('/LivrosAutores/:aut_id', AutoresController.apagarLivroAutores); //params

router.get('/livrosGeneros', GenerosController.listarLivroGeneros); 
router.post('/livrosGeneros', GenerosController.cadastrarLivroGeneros); 
router.patch('/livrosGeneros/:gen_id', GenerosController.editarLivroGeneros); //params
router.delete('/LivrosGeneros/:gen_id', GenerosController.apagarLivroGeneros); //params

module.exports = router;