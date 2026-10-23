const express = require('express');
const router = express.Router();

let manutencoes = [
  { id: 1, caminhaoId: 1, placa: "ABC1D23", descricao: "Troca de oleo", valor: 850 }
];

router.get('/', (req, res) => {
  res.status(200).json(manutencoes);
});

router.post('/', (req, res) => {
  const { placa, caminhaoId, descricao, valor } = req.body;

  if ((!placa && !caminhaoId) || !descricao || !valor) {
    return res.status(400).json({ erro: "Todos os campos sao obrigatorios" });
  }

  const novaManutencao = {
    id: manutencoes.length + 1,
    placa: placa || "ABC1D23",
    caminhaoId: caminhaoId || 1,
    descricao,
    valor
  };

  manutencoes.push(novaManutencao);
  res.status(201).json({
    mensagem: "Manutencao cadastrada com sucesso!",
    manutencao: novaManutencao
  });
});

module.exports = router;
