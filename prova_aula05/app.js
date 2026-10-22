const express = require('express');
const cors = require('cors');

const loggerMiddleware = require('./middlewares/loggerMiddleware');
const authMiddleware = require('./middlewares/authMiddleware');

const motoristasRouter = require('./routes/motoristas');
const manutencoesRouter = require('./routes/manutencoes');

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: "ONLINE",
    aplicacao: "Binario Tech API v2"
  });
});

app.use('/api/v1/motoristas', authMiddleware, motoristasRouter);
app.use('/api/v1/manutencoes', authMiddleware, manutencoesRouter);

app.use((req, res) => {
  res.status(404).json({
    erro: 'Rota nao encontrada',
    caminho: req.originalUrl
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
