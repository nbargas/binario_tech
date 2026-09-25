a de Resolucao - Exercicios Praticos de MongoDB Avançado com Mongoose (Subdocumentos, Regex e Operadores)
Este documento contem o passo a passo detalhado para a resolucao dos exercicios praticos envolvendo buscas parciais com Expressões Regulares ($regex), manipulacao de arrays e subdocumentos com o operador $push, validacao customizada de campos numericos no Schema e operacoes de remocao de documentos por ID no MongoDB.

Sumario
Exercicio 01 - Busca Parcial Case-Insensitive por Placa com Regex

Exercicio 02 - Adicao de Subdocumentos em Array com $push

Exercicio 03 - Validacao de Custo Unitario Nao Negativo no Schema

Exercicio 04 - Remocao de Manutencao por _id via cURL

Exercicio 01
Objetivo: Criar um metodo no controller para buscar manutencoes filtrando pela placa do veiculo com busca parcial case-insensitive utilizando $regex do MongoDB.

Passo 1: Implementar o metodo no src/controllers/manutencaoController.js
JavaScript
const Manutencao = require('../models/Manutencao');

exports.buscarPorPlaca = async (req, res) => {
  try {
    const { placa } = req.query;

    if (!placa) {
      return res.status(400).json({ erro: 'O parametro de busca placa e obrigatorio' });
    }

    // Busca no MongoDB utilizando expressao regular (i = case-insensitive)
    const manutencoes = await Manutencao.find({
      placaVeiculo: { $regex: placa, $options: 'i' }
    });

    return res.status(200).json(manutencoes);
  } catch (error) {
    return res.status(500).json({
      erro: 'Erro ao buscar manutencoes por placa',
      detalhes: error.message
    });
  }
};
Passo 2: Mapear a rota em src/routes/manutencaoRoutes.js
JavaScript
const express = require('express');
const router = express.Router();
const manutencaoController = require('../controllers/manutencaoController');

router.get('/buscar', manutencaoController.buscarPorPlaca);

module.exports = router;
Exercicio 02
Objetivo: Adicionar o endpoint HTTP POST /api/v1/manutencoes/:id/pecas para inserir um novo subdocumento de peca no array pecasSubstituidas usando o operador $push.

Passo 1: Implementar o metodo no src/controllers/manutencaoController.js
JavaScript
exports.adicionarPeca = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, quantidade, custoUnitario } = req.body;

    if (!nome || !quantidade || custoUnitario === undefined) {
      return res.status(400).json({ erro: 'Todos os campos da peca sao obrigatorios' });
    }

    // Atualiza o documento adicionando o novo objeto ao array pecasSubstituidas
    const manutencaoAtualizada = await Manutencao.findByIdAndUpdate(
      id,
      {
        $push: {
          pecasSubstituidas: { nome, quantidade, custoUnitario }
        }
      },
      { new: true, runValidators: true } // Retorna o documento atualizado e roda as validacoes do Schema
    );

    if (!manutencaoAtualizada) {
      return res.status(404).json({ erro: 'Registro de manutencao nao encontrado' });
    }

    return res.status(200).json(manutencaoAtualizada);
  } catch (error) {
    return res.status(400).json({
      erro: 'Erro ao adicionar peca a manutencao',
      detalhes: error.message
    });
  }
};
Passo 2: Mapear a rota em src/routes/manutencaoRoutes.js
JavaScript
router.post('/:id/pecas', manutencaoController.adicionarPeca);
Exercicio 03
Objetivo: Adicionar validacao no Schema itemPecaSchema garantindo que o campo custoUnitario nao aceite valores negativos.

Edicao do Schema em src/models/Manutencao.js:
JavaScript
const mongoose = require('mongoose');

// Schema para os subdocumentos de pecas
const itemPecaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  quantidade: {
    type: Number,
    required: true,
    min: [1, 'A quantidade deve ser de pelo menos 1 item']
  },
  custoUnitario: {
    type: Number,
    required: true,
    min: [0, 'O custo unitario nao pode ser um valor negativo'] // Validacao de valor min 0
  }
});

const manutencaoSchema = new mongoose.Schema({
  placaVeiculo: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  pecasSubstituidas: [itemPecaSchema] // Array de subdocumentos
}, {
  timestamps: true
});

module.exports = mongoose.model('Manutencao', manutencaoSchema);
Exercicio 04
Objetivo: Escrever um comando em cURL para deletar um registro de manutencao pelo seu _id do MongoDB e validar o retorno 200 OK.

Passo 1: Implementar o metodo no controller e rota (caso ainda nao exista)
JavaScript
// controller
exports.deletarManutencao = async (req, res) => {
  try {
    const { id } = req.params;
    const deletado = await Manutencao.findByIdAndDelete(id);

    if (!deletado) {
      return res.status(404).json({ erro: 'Manutencao nao encontrada' });
    }

    return res.status(200).json({ mensagem: 'Manutencao removida com sucesso' });
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao deletar manutencao' });
  }
};
Passo 2: Executar o comando no terminal (substituindo <ID_DO_MONGODB> pelo hash de 24 caracteres)
Bash
curl -i -X DELETE http://localhost:3000/api/v1/manutencoes/65f1a2b3c4d5e6f7a8b9c0d1
Retorno esperado no terminal:

HTTP
HTTP/1.1 200 OK
Content-Type: application/json

{
  "mensagem": "Manutencao removida com sucesso"
}
