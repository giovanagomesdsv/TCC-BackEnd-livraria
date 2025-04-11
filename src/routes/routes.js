const express = require('express'); 
const router = express.Router(); 

const UsuariosController = require('../controllers/usuarios'); 
const UsuariosController = require('../controllers/resenhistas'); 
const UsuariosController = require('../controllers/titulos'); 

router.get('/resenhistas', ResenhistasController.listarResenhistas); 
router.post('/resenhistas', ResenhistasController.cadastrarResenhistas); 
router.patch('/resenhistas', ResenhistasController.editarResenhistas); 
router.delete('/resenhistas', ResenhistasController.apagarResenhistas); 

router.get('/usuarios', UsuariosController.listarUsuarios); 
router.post('/usuarios', UsuariosController.cadastrarUsuarios); 
router.patch('/usuarios', UsuariosController.editarUsuarios); 
router.delete('/usuarios', UsuariosController.apagarUsuarios); 

router.get('/titulos', TitulosController.listarTitulos); 
router.post('/titulos', TitulosController.cadastrarTitulos); 
router.patch('/titulos', TitulosController.editarTitulos); 
router.delete('/titulos', TitulosController.apagarTitulos); 


module.exports = router;