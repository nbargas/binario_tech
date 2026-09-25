Guia de Resolucao - Exercicios Praticos de Middlewares, Rotas e Seguranca em Node.js
Este documento contem o passo a passo detalhado para a resolucao dos exercicios praticos envolvendo a criacao e aplicacao de middlewares customizados, modularizacao de rotas, validacao de dados, tratamento de erros 404 e automacao de testes de seguranca com Shell Script.

Sumario
Exercicio 01 - Verificacao de Rota Health e Logs de Middleware

Exercicio 02 - Criacao do Roteador de Manutencoes

Exercicio 03 - Registro de Rota com Middleware de Autenticacao

Exercicio 04 - Criacao do Middleware de Validacao de CNH

Exercicio 05 - Aplicacao e Teste de Validacao de CNH

Exercicio 06 - Teste de Middleware Global para Rotas Inexistentes (404)

Exercicio 07 - Automacao de Testes de Seguranca via Shell Script

Exercicio 08 - Encontrando e Encerrando o Processo da API

Exercicio 01
Objetivo: Efetuar uma requisicao GET na rota /health e verificar nos logs do terminal a mensagem gerada pelo loggerMiddleware.

Execucao no Terminal:
Bash
curl -s http://localhost:3000/health
Verificacao: No terminal onde o servidor Node.js esta rodando, observe o log exibido pelo loggerMiddleware (exemplo: [LOG] GET /health - 2026-09-25T16:00:00.000Z).

Exercicio 02
Objetivo: Crie o arquivo routes/manutencoes.js para gerenciar orcamentos de manutencao dos caminhoes, com rotas para listar e cadastrar manutencoes.

Codigo para routes/manutencoes.js:
JavaScript
const express = require('express');
const router = express.Router();

// Base de dados temporaria em memoria
const manutencoes = [
  { id: 1, caminhaoId: 1, descricao: 'Troca de oleo', valor: 850.00 }
];

// Rota GET - Listar manutencoes
router.get('/', (req, res) => {
  res.status(200).json(manutencoes);
});

// Rota POST - Cadastrar nova manutencao
router.post('/', (req, res) => {
  const { caminhaoId, descricao, valor } = req.body;

  if (!caminhaoId || !descricao || !valor) {
    return res.status(400).json({ erro: 'Todos os campos sao obrigatorios' });
  }

  const novaManutencao = {
    id: manutencoes.length + 1,
    caminhaoId,
    descricao,
    valor
  };

  manutencoes.push(novaManutencao);
  res.status(201).json(novaManutencao);
});

module.exports = router;
Exercicio 03
Objetivo: Registrar o roteador de manutencoes no arquivo app.js (ou servidor.js) sob o caminho /api/v1/manutencoes, aplicando o authMiddleware.

Trecho de codigo no arquivo principal (app.js / servidor.js):
JavaScript
const manutencoesRouter = require('./routes/manutencoes');
const authMiddleware = require('./middlewares/authMiddleware'); // Importacao do middleware de autenticacao

// Registro da rota com protecao de autenticacao
app.use('/api/v1/manutencoes', authMiddleware, manutencoesRouter);
Exercicio 04
Objetivo: Criar um middleware exclusivo de validacao de CNH em middlewares/validaCnh.js garantindo que a CNH possua exatamente 11 digitos numericos.

Codigo para middlewares/validaCnh.js:
JavaScript
function validaCnh(req, res, next) {
  const { cnh } = req.body;

  // Expressao regular para verificar se contem exatamente 11 digitos numericos
  const regexCnh = /^\d{11}$/;

  if (!cnh || !regexCnh.test(cnh)) {
    return res.status(400).json({
      erro: 'CNH invalida. A CNH deve conter exatamente 11 digitos numericos.'
    });
  }

  next();
}

module.exports = validaCnh;
Exercicio 05
Objetivo: Aplicar o middleware validaCnh na rota POST de motoristas e testar o envio de uma CNH invalida via cURL.

Passo 1: Aplicacao na rota em routes/motoristas.js
JavaScript
const validaCnh = require('../middlewares/validaCnh');

router.post('/', validaCnh, (req, res) => {
  // Lógica de cadastro do motorista
  res.status(201).json({ mensagem: 'Motorista cadastrado com sucesso!' });
});
Passo 2: Teste via cURL enviando CNH invalida
Bash
curl -i -X POST http://localhost:3000/api/v1/motoristas \
  -H "Content-Type: application/json" \
  -d '{"nome": "Carlos Silva", "cnh": "123"}'
Retorno esperado: Cabecalho HTTP/1.1 400 Bad Request com o objeto JSON contendo a mensagem de erro da CNH.

Exercicio 06
Objetivo: Fazer uma requisicao GET para uma rota inexistente (/api/v1/clientes) e confirmar o tratamento pelo middleware global de 404.

Teste no terminal:
Bash
curl -i -s http://localhost:3000/api/v1/clientes
Estrutura de resposta esperada:

JSON
HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "erro": "Rota nao encontrada",
  "caminho": "/api/v1/clientes"
}
Exercicio 07
Objetivo: Criar o script teste_seguranca.sh para simular 3 tentativas de acesso sem chave de API e 1 tentativa com chave valida, registrando a auditoria em audit_seguranca.log.

Passo 1: Criar o script teste_seguranca.sh
Bash
cat << 'EOF' > teste_seguranca.sh
#!/bin/bash

API_URL="http://localhost:3000/api/v1/manutencoes"
CHAVE_VALIDA="minha_chave_secreta_123"

echo "=== INICIANDO AUDITORIA DE SEGURANCA ==="
date

echo -e "\n--- Tentativa 1 (Sem API Key) ---"
curl -i -s $API_URL

echo -e "\n--- Tentativa 2 (Sem API Key) ---"
curl -i -s $API_URL

echo -e "\n--- Tentativa 3 (Sem API Key) ---"
curl -i -s $API_URL

echo -e "\n--- Tentativa 4 (Com API Key Valida) ---"
curl -i -s -H "x-api-key: $CHAVE_VALIDA" $API_URL

echo -e "\n=== AUDITORIA FINALIZADA ==="
EOF
Passo 2: Tornar o script executavel e rodar com redirecionamento de logs
Bash
chmod +x teste_seguranca.sh
./teste_seguranca.sh > audit_seguranca.log 2>&1
Exercicio 08
Objetivo: Localizar o PID do processo Node.js e encerra-lo pelo terminal Linux.

Passo 1: Localizar o processo
Bash
ps aux | grep node
Identifique o número da coluna PID correspondente ao processo Node.js em execução.

Passo 2: Encerrar o processo pelo PID
Substitua <PID> pelo número correspondente encontrado no passo anterior (exemplo: 4567):

Bash
kill -9 4567
kill -9: Força o encerramento imediato do processo selecionado no sistema operacional.
