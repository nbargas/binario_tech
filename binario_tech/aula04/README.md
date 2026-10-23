Guia de Resolucao - Exercicios Praticos REST API e Shell Scripting
Este documento contem a resolucao detalhada de cada exercicio, cobrindo operacoes CRUD em APIs REST, manipulacao de query params, validacao de status codes e automacao com Shell Script.

Sumario
Exercicio 01 - Consulta de Veiculo por ID

Exercicio 02 - Cadastro de Veiculo (POST 201)

Exercicio 03 - Validacao de Payload (400 Bad Request)

Exercicio 04 - Filtragem com Query Parameters

Exercicio 05 - Atualizacao Parcial (PATCH)

Exercicio 06 - Validacao de Recurso Inexistente (404)

Exercicio 07 - Criacao de Rota PUT na API

Exercicio 08 - Automacao do Fluxo CRUD via Shell Script

Exercicio 01
Objetivo: Efetuar uma requisicao GET buscando apenas o veiculo de ID 1 e exibir o resultado formatado com jq.

Bash
curl -s http://localhost:3000/api/v1/veiculos/1 | jq '.'
curl -s: Executa a requisicao HTTP em modo silencioso.

http://localhost:3000/api/v1/veiculos/1: Rota do recurso especifico.

| jq '.': Recebe o JSON e o exibe formatado com identacao no terminal.

Exercicio 02
Objetivo: Cadastrar um novo caminhao da montadora 'Volvo' (modelo 'FH 540', placa 'KLL-9090') via POST e validar o status HTTP 201 Created.

Opcao com cURL:

Bash
curl -i -X POST http://localhost:3000/api/v1/veiculos \
  -H "Content-Type: application/json" \
  -d '{"montadora": "Volvo", "modelo": "FH 540", "placa": "KLL-9090", "status": "DISPONIVEL"}'
Opcao com HTTPie:

Bash
http POST http://localhost:3000/api/v1/veiculos montadora="Volvo" modelo="FH 540" placa="KLL-9090" status="DISPONIVEL"
-i (no cURL): Exibe os cabecalhos de resposta HTTP, permitindo confirmar a linha HTTP/1.1 201 Created.

Exercicio 03
Objetivo: Tentar cadastrar um veiculo sem o campo 'placa' e confirmar se a API retorna 400 Bad Request.

Bash
curl -i -X POST http://localhost:3000/api/v1/veiculos \
  -H "Content-Type: application/json" \
  -d '{"montadora": "Volvo", "modelo": "FH 540"}'
Retorno esperado: Cabecalho HTTP/1.1 400 Bad Request juntamente com a mensagem de erro no corpo da resposta (ex: {"erro": "O campo placa e obrigatorio"}).

Exercicio 04
Objetivo: Fazer uma requisicao GET filtrando os veiculos pelo query parameter status=DISPONIVEL.

Bash
curl -s "http://localhost:3000/api/v1/veiculos?status=DISPONIVEL" | jq '.'
Uso das aspas (""): Garante que o caractere ? e eventuais & sejam interpretados corretamente pelo terminal sem necessidade de escape.

Exercicio 05
Objetivo: Atualizar o status do veiculo de ID 3 para 'EM_ROTA' utilizando a rota PATCH.

Bash
curl -i -X PATCH http://localhost:3000/api/v1/veiculos/3 \
  -H "Content-Type: application/json" \
  -d '{"status": "EM_ROTA"}'
PATCH: Atualiza pontualmente apenas os campos informados no corpo da requisicao sem substituir o objeto inteiro.

Exercicio 06
Objetivo: Tentar atualizar ou deletar um veiculo com ID inexistente (ex: ID 99) e validar o status code 404 Not Found.

Teste com DELETE:

Bash
curl -i -X DELETE http://localhost:3000/api/v1/veiculos/99
Teste com PATCH:

Bash
curl -i -X PATCH http://localhost:3000/api/v1/veiculos/99 \
  -H "Content-Type: application/json" \
  -d '{"status": "EM_ROTA"}'
Retorno esperado: Cabecalho HTTP/1.1 404 Not Found.

Exercicio 07
Objetivo: Adicionar uma nova rota PUT na API (/api/v1/veiculos/:id) para substituir totalmente os dados de um veiculo.

Codigo a ser adicionado no arquivo do servidor Node.js (ex: servidor.js):
JavaScript
app.put('/api/v1/veiculos/:id', (req, res) => {
  const { id } = req.params;
  const { montadora, modelo, placa, status } = req.body;

  // Validacao basica dos campos obrigatorios para substituicao total
  if (!montadora || !modelo || !placa || !status) {
    return res.status(400).json({ erro: 'Todos os campos sao obrigatorios para a substituicao (PUT)' });
  }

  const index = veiculos.findIndex(v => v.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ erro: 'Veiculo nao encontrado' });
  }

  // Substitui completamente os dados do objeto
  veiculos[index] = { id: parseInt(id), montadora, modelo, placa, status };

  return res.status(200).json(veiculos[index]);
});
Exercicio 08
Objetivo: Criar o script teste_crud.sh para executar o fluxo de cadastro, atualizacao e remocao de veiculos, gravando o resultado em crud_result.log.

Passo 1: Criar o arquivo teste_crud.sh
Bash
cat << 'EOF' > teste_crud.sh
#!/bin/bash

API_URL="http://localhost:3000/api/v1/veiculos"

echo "=== INICIANDO TESTE CRUD ==="
date

echo -e "\n1. Cadastrando Veiculo 1 (Scania)..."
curl -s -X POST $API_URL -H "Content-Type: application/json" \
  -d '{"montadora": "Scania", "modelo": "R 450", "placa": "ABC-1234", "status": "DISPONIVEL"}'

echo -e "\n\n2. Cadastrando Veiculo 2 (Mercedes)..."
curl -s -X POST $API_URL -H "Content-Type: application/json" \
  -d '{"montadora": "Mercedes", "modelo": "Actros", "placa": "XYZ-5678", "status": "DISPONIVEL"}'

echo -e "\n\n3. Atualizando Status do Veiculo de ID 1..."
curl -s -X PATCH $API_URL/1 -H "Content-Type: application/json" \
  -d '{"status": "EM_ROTA"}'

echo -e "\n\n4. Deletando Veiculo de ID 2..."
curl -s -X DELETE $API_URL/2

echo -e "\n\n=== TESTE CONCLUIDO ==="
EOF
Passo 2: Dar permissao de execucao e rodar o script com redirecionamento de log
Bash
chmod +x teste_crud.sh
./teste_crud.sh > crud_result.log 2>&1
chmod +x: Concede permissao de execucao ao script Shell.

> crud_result.log 2>&1: Redireciona tanto a saida padrao quanto os erros para o arquivo de log especificado.
