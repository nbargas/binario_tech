Guia de Resolucao - Exercicios Praticos de Seeds, Tratamento Centralizado de Erros e Scripts do NPM
Este documento contem o passo a passo detalhado para a resolucao dos exercicios praticos envolvendo o povoamento adicional de banco de dados via Seeds do Knex.js, tratamento global de erros de sintaxe em JSON com Middlewares, automacao de rotinas de banco de dados no package.json e testes de validacao de entrada via cURL.

Sumario
Exercicio 01 - Criacao de Seed Adicional Sem Delocacao de Dados

Exercicio 02 - Tratamento Global de Erro de Sintaxe em JSON

Exercicio 03 - Automacao de Reset do Banco no package.json

Exercicio 04 - Teste de Validacao de Campo Obrigatorio via cURL

Exercicio 01
Objetivo: Criar um arquivo de Seed src/database/seeds/02_povoar_mais_veiculos.js para adicionar dois novos veiculos (Mercedes-Benz e DAF) garantindo que os dados existentes na tabela nao sejam apagados.

Passo 1: Criar o arquivo de Seed via CLI
Bash
npx knex seed:make 02_povoar_mais_veiculos
Passo 2: Editar o arquivo gerado em src/database/seeds/02_povoar_mais_veiculos.js
JavaScript
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Insere os novos registros sem chamar knex('veiculos').del() ou .truncate()
  await knex('veiculos').insert([
    {
      montadora: 'Mercedes-Benz',
      modelo: 'Actros 2651',
      placa: 'MBZ-2026',
      status: 'DISPONIVEL'
    },
    {
      montadora: 'DAF',
      modelo: 'XF 530',
      placa: 'DAF-5300',
      status: 'EM_ROTA'
    }
  ]);
};
Passo 3: Executar a Seed no terminal
Bash
npx knex seed:run
Exercicio 02
Objetivo: Adicionar ao middleware tratarErros.js uma verificacao especifica para capturar erros de sintaxe de JSON (err instanceof SyntaxError), retornando HTTP Status Code 400 Bad Request.

Codigo para src/middlewares/tratarErros.js:
JavaScript
function tratarErros(err, req, res, next) {
  // Captura erros de sintaxe do JSON (ex: aspas nao fechadas ou virgulas extras no body)
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      erro: 'JSON malformado. Verifique a sintaxe dos dados enviados no corpo da requisicao.'
    });
  }

  // Tratamento generico para outros erros nao mapeados
  console.error(err.stack);
  return res.status(500).json({
    erro: 'Ocorreu um erro interno no servidor.'
  });
}

module.exports = tratarErros;
Exercicio 03
Objetivo: Criar o script customizado "db:reset" dentro de package.json para executar o rollback de todas as migrations, aplicar a versao mais recente e rodar as seeds sequencialmente.

Edicao da secao "scripts" no arquivo package.json:
JSON
{
  "name": "sistema-telemetria",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js",
    "db:reset": "knex migrate:rollback --all && knex migrate:latest && knex seed:run"
  }
}
Execucao do script pelo terminal:
Bash
npm run db:reset
Exercicio 04
Objetivo: Escrever um comando cURL testando o envio de uma requisicao sem o campo obrigatorio placa para validar o retorno com HTTP Status Code 400 Bad Request.

Bash
curl -i -X POST http://localhost:3000/api/v1/veiculos \
  -H "Content-Type: application/json" \
  -d '{"montadora": "Scania", "modelo": "R 450", "status": "DISPONIVEL"}'
Retorno esperado no terminal:

HTTP
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "erro": "O campo placa e obrigatorio."
}
