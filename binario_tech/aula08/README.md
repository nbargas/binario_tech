a de Resolucao - Exercicios Praticos de Banco de Dados com Knex.js e SQLite
Este documento contem o passo a passo detalhado para a resolucao dos exercicios praticos envolvendo a integracao de banco de dados SQL via Knex.js, criacao de controllers com queries, definicao de rotas com atualizacao parcial, criacao de tabelas via Migrations e gerenciamento de rollback.

Sumario
Exercicio 01 - Consulta de Veiculo por ID com Knex

Exercicio 02 - Atualizacao de Status via PATCH e Knex

Exercicio 03 - Criacao da Migration da Tabela Motoristas

Exercicio 04 - Execucao e Rollback de Migrations via CLI

Exercicio 01
Objetivo: Adicionar o metodo buscarPorId no controller veiculosController.js para consultar um veiculo por ID usando Knex, retornando status 404 Not Found caso o registro nao exista.

Codigo a ser adicionado em src/controllers/veiculosController.js:
JavaScript
const db = require('../database/connection'); // Instancia configurada do Knex

exports.buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;

    // Consulta no banco de dados SQLite usando Knex
    const veiculo = await db('veiculos').where({ id }).first();

    if (!veiculo) {
      return res.status(404).json({ erro: 'Veiculo nao encontrado' });
    }

    return res.status(200).json(veiculo);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno no servidor ao buscar veiculo' });
  }
};
Exercicio 02
Objetivo: Adicionar a rota HTTP PATCH no arquivo src/routes/veiculosRoutes.js mapeando o caminho /:id/status para atualizar o status do veiculo diretamente na tabela.

Passo 1: Adicionar o metodo de atualizacao no veiculosController.js
JavaScript
exports.atualizarStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ erro: 'O campo status e obrigatorio' });
    }

    // Atualiza o registro e verifica quantas linhas foram afetadas
    const linhasAfetadas = await db('veiculos').where({ id }).update({ status });

    if (!linhasAfetadas) {
      return res.status(404).json({ erro: 'Veiculo nao encontrado para atualizacao' });
    }

    return res.status(200).json({ mensagem: 'Status atualizado com sucesso', id, status });
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao atualizar o status do veiculo' });
  }
};
Passo 2: Mapear a rota em src/routes/veiculosRoutes.js
JavaScript
const express = require('express');
const router = express.Router();
const veiculosController = require('../controllers/veiculosController');

// Mapeamento das rotas
router.get('/:id', veiculosController.buscarPorId);
router.patch('/:id/status', veiculosController.atualizarStatus);

module.exports = router;
Exercicio 03
Objetivo: Criar uma nova Migration para criar a tabela motoristas com as colunas id, nome, cnh (unique) e categoria.

Passo 1: Criar o arquivo de Migration via CLI do Knex
Bash
npx knex migrate:make create_table_motoristas
Passo 2: Editar o arquivo gerado dentro de src/database/migrations/
JavaScript
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('motoristas', (table) => {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.string('cnh').unique().notNullable();
    table.string('categoria').notNullable();
    table.timestamps(true, true); // Cria colunas created_at e updated_at
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('motoristas');
};
Passo 3: Executar a Migration
Bash
npx knex migrate:latest
Exercicio 04
Objetivo: Executar os comandos da CLI do Knex para reverter a ultima migration executada (rollback) e em seguida reaplica-la (migrate:latest).

Passo 1: Reverter a ultima migration (Rollback)
Bash
npx knex migrate:rollback
Este comando executa a funcao down da ultima migration aplicada, removendo a tabela motoristas.

Passo 2: Reaplicar todas as migrations pendentes
Bash
npx knex migrate:latest
