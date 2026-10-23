Guia de Resolucao - Exercicios Praticos de Arquitetura MVC, Middlewares e Automacao em Node.js
Este documento contem o passo a passo detalhado para a resolucao dos exercicios praticos envolvendo a estruturacao de projetos Node.js com padrão MVC (Controllers e Routes), criacao de middlewares de validacao de dados, integracao de rotas no servidor e automacao de auditoria via Shell Script.

Sumario
Exercicio 01 - Criacao de Controller e Rota da Mercedes-Benz

Exercicio 02 - Integracao da Rota no Servidor

Exercicio 03 - Criacao do Middleware de Validacao de VIN

Exercicio 04 - Aplicacao do Middleware e Teste de Validacao

Exercicio 05 - Script Shell de Auditoria Completa

Exercicio 01
Objetivo: Criar o controller src/controllers/mercedesController.js e a rota src/routes/mercedesRoutes.js para gerenciar a frota de caminhoes Actros e Atego da Mercedes-Benz.

Passo 1: Criar o arquivo src/controllers/mercedesController.js
JavaScript
// Simulacao de base de dados para a frota Mercedes-Benz
const frotaMercedes = [
  { id: 1, modelo: 'Actros', placa: 'ABC-1234', status: 'EM_ROTA' },
  { id: 2, modelo: 'Atego', placa: 'XYZ-5678', status: 'DISPONIVEL' }
];

// Listar todos os caminhoes da Mercedes
exports.listarFrota = (req, res) => {
  res.status(200).json(frotaMercedes);
};

// Cadastrar novo caminhao na frota
exports.cadastrarCaminhao = (req, res) => {
  const { modelo, placa, status } = req.body;

  if (!modelo || !placa) {
    return res.status(400).json({ erro: 'Modelo e placa sao obrigatorios' });
  }

  const novoCaminhao = {
    id: frotaMercedes.length + 1,
    modelo,
    placa,
    status: status || 'DISPONIVEL'
  };

  frotaMercedes.push(novoCaminhao);
  res.status(201).json(novoCaminhao);
};
Passo 2: Criar o arquivo src/routes/mercedesRoutes.js
JavaScript
const express = require('express');
const router = express.Router();
const mercedesController = require('../controllers/mercedesController');

router.get('/', mercedesController.listarFrota);
router.post('/', mercedesController.cadastrarCaminhao);

module.exports = router;
Exercicio 02
Objetivo: Conectar o novo roteador da Mercedes-Benz no arquivo server.js sob o caminho /api/v1/telemetria/mercedes.

Trecho a incluir no arquivo server.js:
JavaScript
const express = require('express');
const app = express();

app.use(express.json());

// Importacao do roteador da Mercedes
const mercedesRoutes = require('./src/routes/mercedesRoutes');

// Registro do roteador sob o caminho especificado
app.use('/api/v1/telemetria/mercedes', mercedesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
Exercicio 03
Objetivo: Criar o middleware exclusivo de validacao de Chassis/VIN em src/middlewares/validaVin.js garantindo que o codigo VIN possua exatamente 12 caracteres.

Codigo para src/middlewares/validaVin.js:
JavaScript
function validaVin(req, res, next) {
  const { vin } = req.body;

  // Verifica se o campo existe e possui exatamente 12 caracteres
  if (!vin || typeof vin !== 'string' || vin.trim().length !== 12) {
    return res.status(400).json({
      erro: 'Codigo VIN invalido. O VIN deve conter exatamente 12 caracteres.'
    });
  }

  next();
}

module.exports = validaVin;
Exercicio 04
Objetivo: Aplicar o middleware validaVin na rota POST de telemetria da Scania e testar o envio de um VIN invalido via cURL.

Passo 1: Aplicacao na rota da Scania (src/routes/scaniaRoutes.js)
JavaScript
const express = require('express');
const router = express.Router();
const validaVin = require('../middlewares/validaVin');

router.post('/', validaVin, (req, res) => {
  res.status(201).json({ mensagem: 'Telemetria Scania registrada com sucesso!' });
});

module.exports = router;
Passo 2: Teste via cURL enviando um VIN invalido (ex: 5 caracteres)
Bash
curl -i -X POST http://localhost:3000/api/v1/telemetria/scania \
  -H "Content-Type: application/json" \
  -d '{"vin": "12345", "modelo": "R 450"}'
Retorno esperado: Cabecalho HTTP/1.1 400 Bad Request com o objeto JSON contendo a mensagem de erro de validacao do VIN.

Exercicio 05
Objetivo: Criar o script Bash auditoria_completa.sh para consultar em sequencia todas as rotas ativas do servidor e registrar os resultados em auditoria.log.

Passo 1: Criar o arquivo auditoria_completa.sh
Bash
cat << 'EOF' > auditoria_completa.sh
#!/bin/bash

BASE_URL="http://localhost:3000/api/v1"

echo "=== INICIANDO AUDITORIA COMPLETA DAS ROTAS ==="
date

echo -e "\n--- 1. Testando Rota Telemetria Mercedes ---"
curl -i -s $BASE_URL/telemetria/mercedes

echo -e "\n\n--- 2. Testando Rota Telemetria Scania ---"
curl -i -s $BASE_URL/telemetria/scania

echo -e "\n\n--- 3. Testando Rota de Ocorrencias ---"
curl -i -s $BASE_URL/ocorrencias

echo -e "\n\n--- 4. Testando Rota de Veiculos ---"
curl -i -s $BASE_URL/veiculos

echo -e "\n\n=== AUDITORIA FINALIZADA ==="
EOF
Passo 2: Dar permissao de execucao e rodar o script gravando a saida em log
Bash
chmod +x auditoria_completa.sh
./auditoria_completa.sh > auditoria.log 2>&1
