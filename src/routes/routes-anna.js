const express = require('express'); 
const router = express.Router(); 

const LivrariasController = require('../controllers/livrarias'); 
const LivrariaLivrosController = require('../controllers/livraria_livros'); 


router.get('/livrarias', LivrariasController.listarLivrarias); 
router.post('/livrarias', LivrariasController.cadastrarLivrarias); 
router.patch('/livrarias/:id', LivrariasController.editarLivrarias); 
router.delete('/livrarias/:id', LivrariasController.apagarLivrarias); 

router.get('/livrariaLivros', LivrariaLivrosController.listarLivrariaLivros); 
router.post('/livrariaLivros', LivrariaLivrosController.cadastrarLivrariaLivros); 
router.patch('/livrariaLivros/:id', LivrariaLivrosController.editarLivrariaLivros); 
router.delete('/livrariaLivros/:id', LivrariaLivrosController.apagarLivrariaLivros); 
router.delete('/livrariaLivros/del/:id', LivrariaLivrosController.ocultarLivrariaLivros); 

module.exports = router;