const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

// Rota Scania
app.get('/api/v1/scania', (req, res) => {
	res.json({ montadora: "Scania", modelo: "R450", status: "OK", conexao:
true, velocidade_media: 82 });
});

// Rota Mercedes-Benz
app.get('/api/v1/mercedes', (req, res) => {
        res.json({ montadora: "Mercedes-Benz", modelo: "actros", status: "OK", conexao:
true, velocidade_media: 78 });
});

// Rota Volkswagen
app.get('/api/v1/vw', (req, res) => {
        res.json({ montadora: "Volkswagen", modelo: "Delivery", status: "ALERTA", conexao:
false, velocidade_media: 0 });
});

// Rota Volvo
app.get('/api/v1/volvo', (req, res) => {
	res.json({ montadora: "Volvo", modelo: "FH 540", status: "OK", conexao: true, velocidade_media: 90 });
});

// Rota Volkswagen (info)
app.get('/vw/info', (req, res) => {
        res.json({ montadora: "Volkswagen", modelo: "Delivery 11.180", status: "OK", conexao: true, velocidade_media: 75 });
});

app.listen(PORT, () => {
	console.log(`[Binario Tech] Servidor de Telemetria rodando em http://localhost:${PORT}`);
});
