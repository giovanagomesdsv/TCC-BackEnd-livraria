const express = require('express'); 
const router = express.Router(); 

const UsuariosController = require('../controllers/usuarios'); 
const ResenhistasController = require('../controllers/resenhistas'); 
const TitulosController = require('../controllers/titulos'); 

router.get('/resenhistas', ResenhistasController.listarResenhistas); 
router.post('/resenhistas', ResenhistasController.cadastrarResenhistas); 
router.patch('/resenhistas/:id', ResenhistasController.editarResenhistas); 
router.delete('/resenhistas/:id', ResenhistasController.apagarResenhistas);
router.delete('/resenhistas/del/:id', ResenhistasController.ocultarResenhistas);

router.get('/usuarios', UsuariosController.listarUsuarios); 
router.post('/usuarios', UsuariosController.cadastrarUsuarios); 
router.patch('/usuarios/:id', UsuariosController.editarUsuarios); 
router.delete('/usuarios/:id', UsuariosController.apagarUsuarios); 

// NOVA ROTA: Exclusão lógica (ocultar usuário)
router.delete('/usuarios/del/:id', UsuariosController.ocultarUsuario);

router.get('/titulos', TitulosController.listarTitulos); 
router.post('/titulos', TitulosController.cadastrarTitulos); 
router.patch('/titulos/:id', TitulosController.editarTitulos); 
router.delete('/titulos/:id', TitulosController.apagarTitulos); 

module.exports = router;
