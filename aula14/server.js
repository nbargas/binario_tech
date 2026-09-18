require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`[Binário Tech] Servidor Ativo na porta ${PORT}`);
});
