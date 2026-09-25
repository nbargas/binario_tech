Guia de Resolucao - Exercicios Praticos de Validacao, Sanitizacao e Middlewares Customizados
Este documento contem o passo a passo detalhado para a resolucao dos exercicios praticos envolvendo sanitizacao e transformacao de campos (.toUpperCase()), validacao de campos opcionais com intervalo dinamico usando express-validator, criacao de middlewares customizados para inspecao de cabeçalhos HTTP e filtragem de respostas de erro via CLI com jq.

Sumario
Exercicio 01 - Sanitizacao de Placa com toUpperCase

Exercicio 02 - Validacao de Campo Opcional (Ano de Fabricacao)

Exercicio 03 - Middleware de Verificacao de Content-Type

Exercicio 04 - Requisicao com Payload Incorreto e Filtro com jq

Exercicio 01
Objetivo: Adicionar uma regra de validacao na lista regrasCadastroVeiculo utilizando express-validator garantindo que o campo placa seja automaticamente convertido para letras maiusculas com o sanitizador .toUpperCase().

Codigo em src/validators/veiculoValidator.js:
JavaScript
const { body } = require('express-validator');

const regrasCadastroVeiculo = [
  body('montadora')
    .notEmpty().withMessage('A montadora e obrigatoria'),
  
  body('modelo')
    .notEmpty().withMessage('O modelo e obrigatorio'),

  body('placa')
    .notEmpty().withMessage('A placa e obrigatoria')
    .isLength({ min: 7, max: 8 }).withMessage('A placa deve ter entre 7 e 8 caracteres')
    .toUpperCase() // Sanitizador: converte automaticamente para caixa alta
];

module.exports = { regrasCadastroVeiculo };
Exercicio 02
Objetivo: Adicionar o campo opcional anoFabricacao na validacao de veiculos, garantindo que, se for fornecido (.optional()), seja um numero inteiro entre 2000 e o ano atual (2026).

Codigo atualizado em src/validators/veiculoValidator.js:
JavaScript
const { body } = require('express-validator');

const anoAtual = new Date().getFullYear(); // Obtem o ano atual dinamicamente (2026)

const regrasCadastroVeiculo = [
  body('montadora')
    .notEmpty().withMessage('A montadora e obrigatoria'),
  
  body('modelo')
    .notEmpty().withMessage('O modelo e obrigatorio'),

  body('placa')
    .notEmpty().withMessage('A placa e obrigatoria')
    .toUpperCase(),

  // Campo opcional com validacao de valor inteiro e intervalo de anos
  body('anoFabricacao')
    .optional({ checkFalsy: true })
    .isInt({ min: 2000, max: anoAtual })
    .withMessage(`O ano de fabricacao deve ser um numero inteiro entre 2000 e ${anoAtual}`)
];

module.exports = { regrasCadastroVeiculo };
Exercicio 03
Objetivo: Criar um middleware customizado para verificar se a requisicao possui o cabecalho Content-Type: application/json nas requisicoes do tipo POST. Caso nao possua, retornar HTTP 400 Bad Request.

Passo 1: Criar o arquivo src/middlewares/validaContentType.js
JavaScript
function validaContentType(req, res, next) {
  // Executa a verificacao apenas para requisicoes POST
  if (req.method === 'POST') {
    const contentType = req.headers['content-type'];

    if (!contentType || !contentType.includes('application/json')) {
      return res.status(400).json({
        erro: 'Cabecalho Content-Type invalido. As requisicoes POST devem utilizar application/json'
      });
    }
  }

  next();
}

module.exports = validaContentType;
Passo 2: Registrar o middleware globalmente ou na rota desejada (app.js ou server.js)
JavaScript
const express = require('express');
const app = express();
const validaContentType = require('./src/middlewares/validaContentType');

app.use(express.json());
app.use(validaContentType); // Aplica o middleware globalmente
Exercicio 04
Objetivo: Escrever um comando cURL enviando um payload incorreto para a API e utilizar o utilitario jq para filtrar e exibir no terminal apenas a lista de mensagens de erro.

Comando no terminal:
Bash
curl -s -X POST http://localhost:3000/api/v1/veiculos \
  -H "Content-Type: application/json" \
  -d '{"montadora": "", "anoFabricacao": 1998}' | jq '.erros[].msg'
curl -s: Modo silencioso (nao exibe a barra de progresso do cURL).

-d '{"montadora": "", "anoFabricacao": 1998}': Payload invalido (montadora vazia e ano abaixo do limite de 2000).

| jq '.erros[].msg': Filtra a resposta da API e mapeia somente as strings contidas no campo msg de cada objeto de erro.

Exemplo da saida filtrada no terminal:
JSON
"A montadora e obrigatoria"
"O ano de fabricacao deve ser um numero inteiro entre 2000 e 2026"
