const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const autenticarToken = require('../middlewares/autenticarToken');
const autorizarPerfil = require('../middlewares/autorizarPerfil');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/perfil', autenticarToken, authController.perfil);

// EXERCÍCIO 1: Rota protegida exclusiva para ADMIN
router.get('/admin', autenticarToken, autorizarPerfil(['ADMIN']), authController.rotaAdmin);

module.exports = router;
