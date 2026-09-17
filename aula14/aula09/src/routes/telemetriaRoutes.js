const express = require('express');
const router = express.Router();
const telemetriaController = require('../controllers/telemetriaController');
const db = require('../database/connection');

// Auxiliar: Rota para popular veiculo de teste
router.post('/veiculo-teste', async (req, res) => {
  try {
    const {
      placa = 'TESTE-0001',
      montadora = 'Montadora Teste',
      modelo = 'Modelo Teste'
    } = req.body || {};

    const [id] = await db('veiculos').insert({ placa, montadora, modelo });
    res.status(201).json({ id, placa, montadora, modelo, mensagem: 'Veiculo criado.' });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao criar veiculo.' });
  }
});

// Cadastrar leitura de telemetria
router.post('/', telemetriaController.registrarLeitura);

// Relatorio completo (com filtro opcional de alerta via query param)
router.get('/relatorio', telemetriaController.listarRelatorioCompleto);

// Buscar leituras de um veiculo especifico
router.get('/veiculo/:id', telemetriaController.buscarPorVeiculo);

module.exports = router;
