const express = require('express');
const router = express.Router();

let manutencoes = [
  { id: 1, caminhao: "Volvo FH 2020", descricao: "Troca de oleo", valor: 450.00, data: "2026-07-01" },
  { id: 2, caminhao: "Scania R450", descricao: "Revisao de freios", valor: 890.50, data: "2026-07-15" },
];

// GET /api/v1/manutencoes
router.get('/', (req, res) => {
  res.status(200).json(manutencoes);
});

// POST /api/v1/manutencoes
router.post('/', (req, res) => {
  const { caminhao, descricao, valor, data } = req.body;

  if (!caminhao || !descricao || !valor || !data) {
    return res.status(400).json({ erro: "Campos 'caminhao', 'descricao', 'valor' e 'data' sao obrigatorios." });
  }

  const novaManutencao = {
    id: manutencoes.length + 1,
    caminhao,
    descricao,
    valor,
    data,
  };

  manutencoes.push(novaManutencao);
  res.status(201).json(novaManutencao);
});

module.exports = router;
