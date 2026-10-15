const express = require('express');
const app = express();
const PORT = 3002;

app.use(express.json());

// Dados em memória para testes
let veiculos = [
  { id: 1, placa: "ABC1234", montadora: "Fiat", modelo: "Uno", status: "disponivel" }
];

// POST /api/v1/veiculos
app.post('/api/v1/veiculos', (req, res) => {
  const { placa, montadora, modelo, status } = req.body;
  if (!placa || !montadora || !modelo) {
    return res.status(400).json({ erro: "Campos 'placa', 'montadora' e 'modelo' sao obrigatorios." });
  }
  const novoVeiculo = {
    id: veiculos.length ? veiculos[veiculos.length - 1].id + 1 : 1,
    placa,
    montadora,
    modelo,
    status: status || "disponivel"
  };
  veiculos.push(novoVeiculo);
  return res.status(201).json(novoVeiculo);
});

// GET /api/v1/veiculos/:id
app.get('/api/v1/veiculos/:id', (req, res) => {
  const veiculo = veiculos.find(v => v.id == req.params.id);
  if (!veiculo) return res.status(404).json({ erro: "Veiculo nao encontrado." });
  return res.json(veiculo);
});

// PUT /api/v1/veiculos/:id (DESAFIO 3)
app.put('/api/v1/veiculos/:id', (req, res) => {
  const { id } = req.params;
  const { placa, montadora, modelo, status } = req.body;

  if (!placa || !montadora || !modelo || !status) {
    return res.status(400).json({ 
      erro: "Campos 'placa', 'montadora', 'modelo' e 'status' sao obrigatorios para substituicao total." 
    });
  }

  const index = veiculos.findIndex(v => v.id == id);
  if (index === -1) {
    return res.status(404).json({ erro: "Veiculo nao encontrado." });
  }

  veiculos[index] = { id: veiculos[index].id, placa, montadora, modelo, status };
  return res.status(200).json(veiculos[index]);
});

// PATCH /api/v1/veiculos/:id
app.patch('/api/v1/veiculos/:id', (req, res) => {
  const veiculo = veiculos.find(v => v.id == req.params.id);
  if (!veiculo) return res.status(404).json({ erro: "Veiculo nao encontrado." });
  Object.assign(veiculo, req.body);
  return res.json(veiculo);
});

// DELETE /api/v1/veiculos/:id
app.delete('/api/v1/veiculos/:id', (req, res) => {
  const index = veiculos.findIndex(v => v.id == req.params.id);
  if (index === -1) return res.status(404).json({ erro: "Veiculo nao encontrado." });
  veiculos.splice(index, 1);
  return res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`[Binario Tech] API de Frotas rodando em http://localhost:${PORT}`);
});

// DESAFIO 3 - Rota PUT
app.put('/api/v1/veiculos/:id', (req, res) => {
  const { id } = req.params;
  const { placa, montadora, modelo, status } = req.body;

  if (!placa || !montadora || !modelo || !status) {
    return res.status(400).json({ 
      erro: "Campos 'placa', 'montadora', 'modelo' e 'status' sao obrigatorios para substituicao total." 
    });
  }

  const index = veiculos.findIndex(v => v.id == id);
  if (index === -1) {
    return res.status(404).json({ erro: "Veiculo nao encontrado." });
  }

  veiculos[index] = { id: veiculos[index].id, placa, montadora, modelo, status };
  return res.status(200).json(veiculos[index]);
});
