Guia de Resolucao - Exercicios Praticos de Testes Automatizados, Geracao de Tokens JWT e Controle de Versao
Este documento contem o passo a passo detalhado para a resolucao dos exercicios praticos envolvendo verificacao automatizada de saude da API via Shell Script, implementacao de rotas para geracao de tokens JWT de teste, consumo de rotas privadas utilizando cURL e jq, e validacao de integridade do ambiente Git.

Sumario
Exercicio 01 - Script Shell de Health Check

Exercicio 02 - Criacao de Endpoint para Geracao de JWT de Teste

Exercicio 03 - Requisicao Authenticated com cURL e Extraçao com jq

Exercicio 04 - Verificacao e Limpeza da Working Tree do Git

Exercicio 01
Objetivo: Criar o script Bash testar_simulado.sh para realizar uma requisicao GET na rota /api/v1/health e gravar o HTTP Status Code obtido no arquivo health_check.log.

Passo 1: Criar o script testar_simulado.sh
Bash
cat << 'EOF' > testar_simulado.sh
#!/bin/bash

URL="http://localhost:3000/api/v1/health"

echo "=== VERIFICANDO SAUDE DA API ===" > health_check.log
date >> health_check.log

# Captura apenas o codigo de status HTTP
STATUS_CODE=$(curl -s -o /dev/null -w "%{http_code}" $URL)

echo "HTTP Status Code: $STATUS_CODE" >> health_check.log

if [ "$STATUS_CODE" -eq 200 ]; then
    echo "Status: API Operacional" >> health_check.log
else
    echo "Status: Falha na API" >> health_check.log
fi
EOF
Passo 2: Conceder permissao e executar o script
Bash
chmod +x testar_simulado.sh
./testar_simulado.sh
Passo 3: Confirmar o resultado em health_check.log
Bash
cat health_check.log
Exercicio 02
Objetivo: Adicionar o endpoint POST /api/v1/auth/token-teste no servidor da Aula 17 para gerar e retornar um token JWT valido por 5 minutos (5m).

Trecho de codigo no controller/roteador de autenticacao (src/routes/authRoutes.js ou src/controllers/authController.js):
JavaScript
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'chave_secreta_simulado';

router.post('/token-teste', (req, res) => {
  const payload = {
    id: 99,
    nome: 'Usuario Simulado',
    email: 'simulado@binario.tech',
    perfil: 'ADMIN'
  };

  // Gera o token assinado com validade de 5 minutos
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '5m' });

  return res.status(200).json({
    mensagem: 'Token de teste gerado com sucesso',
    token
  });
});

module.exports = router;
Exercicio 03
Objetivo: Fazer uma requisicao para a rota privada /api/v1/simulado/status utilizando o token gerado no Exercício 2 e extrair apenas o nome do usuario retornado via jq.

Execucao no terminal encadeando a geracao do token com a requisicao protegida:
Bash
# 1. Obter o token e armazenar em uma variavel de ambiente temporaria
TOKEN=$(curl -s -X POST http://localhost:3000/api/v1/auth/token-teste | jq -r '.token')

# 2. Requisitar a rota privada enviando o Bearer Token e filtrar o nome do usuario
curl -s -X GET http://localhost:3000/api/v1/simulado/status \
  -H "Authorization: Bearer $TOKEN" | jq -r '.usuario.nome'
Saida esperada no terminal:

Plaintext
Usuario Simulado
Exercicio 04
Objetivo: Executar o comando git status no diretorio raiz do projeto e certificar-se de que a arvore de trabalho esteja limpa (working tree clean).

Passo 1: Verificar o estado atual do repositorio
Bash
git status
Passo 2: Adicionar, commitar alterações pendentes e verificar a limpeza do ambiente
Bash
# Adiciona os arquivos modificados/criados da aula17 ao stage
git add aula17/ testar_simulado.sh health_check.log

# Realiza o commit
git commit -m "feat(aula17): finaliza exercicios do simulado e automacao de health check"

# Confirma o status limpo da working tree
git status
Validacao final no terminal:

Plaintext
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
