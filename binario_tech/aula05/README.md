Guia de Resolucao - Exercicios Praticos de Manipulacao de Arquivos JSON, APIs REST e Scripts Shell
Este documento contem o passo a passo detalhado para a resolucao dos exercicios praticos envolvendo consumo de rotas com HTTPie, filtragem e manipulacao de dados em arquivos JSON com jq, implementacao de operacoes de leitura e remocao persistentes em Node.js, e criacao de scripts Shell para reset de ambiente.

Sumario
Exercicio 01 - Requisicao GET e Validacao com HTTPie

Exercicio 02 - Filtragem por Montadora com jq

Exercicio 03 - Criacao de Rota de Filtro por Montadora

Exercicio 04 - Criacao de Rota DELETE com Persistencia

Exercicio 05 - Script Shell de Limpeza de Ambiente

Exercicio 01
Objetivo: Efetuar uma requisicao GET na rota /api/v1/ocorrencias via httpie e validar se a resposta e um array contendo os registros do arquivo ocorrencias.json.

Bash
http GET http://localhost:3000/api/v1/ocorrencias
Validacao: O retorno exibido no terminal deve ser um array JSON (iniciado por [) com os mesmos objetos cadastrados no arquivo ocorrencias.json.

Exercicio 02
Objetivo: Utilizar o utilitario jq para ler o arquivo ocorrencias.json e filtrar apenas os registros da montadora "Scania".

Bash
jq '.[] | select(.montadora == "Scania")' ocorrencias.json
.[]: Percorre cada elemento contido no array principal do arquivo.

select(.montadora == "Scania"): Filtra e exibe somente os objetos onde a chave montadora seja exatamente "Scania".

Exercicio 03
Objetivo: Adicionar uma rota GET /api/v1/ocorrencias/montadora/:nome na API para filtrar as ocorrencias salvas em arquivo de acordo com a montadora informada na URL.

Codigo a ser adicionado no arquivo de rotas/servidor (ex: app.js ou servidor.js):
JavaScript
const fs = require('fs');
const path = require('path');

const CAMINHO_ARQUIVO = path.join(__dirname, 'ocorrencias.json');

app.get('/api/v1/ocorrencias/montadora/:nome', (req, res) => {
  const { nome } = req.params;

  fs.readFile(CAMINHO_ARQUIVO, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao ler o arquivo de ocorrencias' });
    }

    const ocorrencias = JSON.parse(data || '[]');
    
    // Filtra ignorando diferencas entre maiusculas e minusculas
    const filtradas = ocorrencias.filter(
      o => o.montadora.toLowerCase() === nome.toLowerCase()
    );

    res.status(200).json(filtradas);
  });
});
Exercicio 04
Objetivo: Criar uma rota DELETE /api/v1/ocorrencias/:id que remove do arquivo JSON a ocorrencia correspondente ao ID informado.

Codigo a ser adicionado no servidor Node.js:
JavaScript
app.delete('/api/v1/ocorrencias/:id', (req, res) => {
  const { id } = req.params;

  fs.readFile(CAMINHO_ARQUIVO, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao ler o arquivo de ocorrencias' });
    }

    let ocorrencias = JSON.parse(data || '[]');
    const indice = ocorrencias.findIndex(o => o.id === parseInt(id));

    if (indice === -1) {
      return res.status(404).json({ erro: 'Ocorrencia nao encontrada' });
    }

    // Remove o item do array
    ocorrencias.splice(indice, 1);

    // Salva a lista atualizada de volta no arquivo JSON
    fs.writeFile(CAMINHO_ARQUIVO, JSON.stringify(ocorrencias, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ erro: 'Erro ao salvar alteracoes no arquivo' });
      }

      res.status(200).json({ mensagem: `Ocorrencia com ID ${id} removida com sucesso` });
    });
  });
});
Exercicio 05
Objetivo: Crie o script Bash limpar_dados.sh que encerra o processo Node.js e exclui o arquivo ocorrencias.json para resetar o ambiente de testes.

Passo 1: Criar o arquivo limpar_dados.sh
Bash
cat << 'EOF' > limpar_dados.sh
#!/bin/bash

echo "=== INICIANDO RESET DO AMBIENTE DE TESTES ==="

echo "1. Buscando e encerrando processos Node.js..."
pkill -f "node" || echo "Nenhum processo Node.js ativo encontrado."

echo "2. Removendo arquivo de dados (ocorrencias.json)..."
if [ -f "ocorrencias.json" ]; then
    rm -f ocorrencias.json
    echo "Arquivo ocorrencias.json removido com sucesso."
else
    echo "Arquivo ocorrencias.json nao existe."
fi

echo "=== RESET CONCLUIDO ==="
EOF
Passo 2: Dar permissao de execucao e rodar o script
Bash
chmod +x limpar_dados.sh
./limpar_dados.sh
