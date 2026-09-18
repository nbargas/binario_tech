const express = require('express');
const cors = require('cors');
const veiculoRoutes = require('./src/routes/veiculoRoutes');
const gerenciadorErros = require('./src/middlewares/gerenciadorErros');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/v1/veiculos', veiculoRoutes);

app.use((req, res) => {
  res.status(404).json({ status: "NAO_ENCONTRADO", mensagem: "Endpoint não encontrado na API." });
});

app.use(gerenciadorErros);

app.listen(PORT, () => {
  console.log(`[Binário Tech] Servidor de Validações Aula 13 ativo na porta ${PORT}`);
});
