const express = require('express'); 
const router = express.Router(); 

const LivrosController = require('../controllers/livros'); 
const ResenhasController = require('../controllers/resenhas'); 

const uploadImage = require('../../middleware/uploadHelper');

// Middleware configurado para a pasta 'livros'
const uploadLivros = uploadImage('livros')

router.get('/livros', LivrosController.listarLivros); 
router.post('/livros', uploadLivros.single('img'), LivrosController.cadastrarLivros); 
router.patch('/livros/:id', LivrosController.editarLivros); 
router.delete('/livros/:id', LivrosController.apagarLivros);
 

router.get('/resenhas', ResenhasController.listarResenhas); 
router.post('/resenhas', ResenhasController.cadastrarResenhas); 
router.patch('/resenhas/:id', ResenhasController.editarResenhas); 
router.delete('/resenhas/:id', ResenhasController.apagarResenhas); 

module.exports = router;