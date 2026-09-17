const express = require('express');
const router = express.Router();
const manutencaoController = require('../controllers/manutencaoController');

router.post('/', manutencaoController.criar);
router.get('/', manutencaoController.listarComFiltros);
router.patch('/:id/status', manutencaoController.atualizarStatus);
router.delete('/:id', manutencaoController.excluir);
router.get('/placa/:placa', manutencaoController.buscarPorPlaca);

router.post('/:id/pecas', manutencaoController.adicionarPeca);
module.exports = router;
