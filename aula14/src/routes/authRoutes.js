const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const autenticarToken = require('../middlewares/autenticarToken');
const autorizarPerfil = require('../middlewares/autorizarPerfil');

router.post('/register', authController.registrar);
router.post('/login', authController.login);

// Rota protegida padrão
router.get('/perfil', autenticarToken, authController.perfil);

// Rota do EXERCÍCIO 1: Protegida por Token + Middleware de Autorização por Perfil
router.get('/admin', autenticarToken, autorizarPerfil(['ADMIN']), authController.adminOnly);

module.exports = router;
