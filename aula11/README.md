Guia de Resolucao - Exercicios Praticos de MongoDB com Mongoose (Schemas, Validacoes e Consultas)
Este documento contem o passo a passo detalhado para a resolucao dos exercicios praticos envolvendo o uso do Mongoose com MongoDB, incluindo consultas customizadas com metodos do Model, definicao de vetores no Schema, validacao com Enumeradores (Enum) e insercoes de documentos com metadados via cURL.

Sumario
Exercicio 01 - Consulta de Alertas por Nivel de Severidade

Exercicio 02 - Atualizacao do Schema para Aceitar Array de Strings

Exercicio 03 - Validacao de Valor Invalido para Campo Enum

Exercicio 04 - Insercao de Alerta com Metadados via cURL

Exercicio 01
Objetivo: Adicionar o metodo buscarPorSeveridade no arquivo alertaController.js para filtrar documentos no MongoDB usando Alerta.find({ nivelSeveridade }) via parâmetro de rota.

Passo 1: Implementar o metodo no src/controllers/alertaController.js
JavaScript
const Alerta = require('../models/Alerta');

exports.buscarPorSeveridade = async (req, res) => {
  try {
    const { nivel } = req.params;

    // Busca no MongoDB todos os alertas que correspondem ao nivel informado
    const alertas = await Alerta.find({ nivelSeveridade: nivel.toUpperCase() });

    return res.status(200).json(alertas);
  } catch (error) {
    return res.status(500).json({
      erro: 'Erro ao buscar alertas por nivel de severidade',
      detalhes: error.message
    });
  }
};
Passo 2: Mapear a rota em src/routes/alertaRoutes.js
JavaScript
const express = require('express');
const router = express.Router();
const alertaController = require('../controllers/alertaController');

router.get('/severidade/:nivel', alertaController.buscarPorSeveridade);

module.exports = router;
Exercicio 02
Objetivo: Modificar o Schema alertaSchema em src/models/Alerta.js para incluir o campo tags como um Array de Strings.

Edicao do arquivo src/models/Alerta.js:
JavaScript
const mongoose = require('mongoose');

const alertaSchema = new mongoose.Schema({
  veiculoId: {
    type: Number,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  nivelSeveridade: {
    type: String,
    enum: ['BAIXO', 'MEDIO', 'ALTO', 'CRITICO'],
    default: 'BAIXO'
  },
  // Campo adicionado: Array de Strings
  tags: [{
    type: String,
    trim: true
  }],
  metadados: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Alerta', alertaSchema);
Exercicio 03
Objetivo: Tentar inserir um alerta informando um valor invalido para o campo nivelSeveridade (ex: 'INVALIDO') e validar a mensagem de erro de Enum retornada pelo Mongoose.

Execucao no terminal via cURL:
Bash
curl -i -X POST http://localhost:3000/api/v1/alertas \
  -H "Content-Type: application/json" \
  -d '{
    "veiculoId": 1,
    "descricao": "Teste de validacao de Enum",
    "nivelSeveridade": "INVALIDO"
  }'
Retorno esperado do Mongoose: Cabecalho HTTP/1.1 400 Bad Request ou 500 Internal Server Error (a depender do tratamento no controller) trazendo o erro de validacao:

JSON
{
  "erro": "Alerta validation failed: nivelSeveridade: `INVALIDO` is not a valid enum value for path `nivelSeveridade`."
}
Exercicio 04
Objetivo: Escrever um comando em cURL para cadastrar um novo alerta com severidade 'BAIXO', incluindo tags e metadados customizados como tipoCarga e velocidade.

Bash
curl -i -X POST http://localhost:3000/api/v1/alertas \
  -H "Content-Type: application/json" \
  -d '{
    "veiculoId": 102,
    "descricao": "Pressao dos pneus ligeiramente abaixo do padrao",
    "nivelSeveridade": "BAIXO",
    "tags": ["pneus", "manutencao_preventiva"],
    "metadados": {
      "tipoCarga": "Perecivel",
      "velocidade": 82.5
    }
  }'
Retorno esperado: Cabecalho HTTP/1.1 201 Created contendo o objeto salvo com o _id gerado automaticamente pelo MongoDB e a estrutura de tags e metadados preenchida.
