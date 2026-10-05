# Resolucao de Exercicios - Aula 21 (Automacao de Deploy Continuo - CI/CD Local)

Este repositorio contem as solucoes dos 3 exercicios praticos da Aula 21: DevOps, Deploy e Automacao de Infraestrutura (Binario Tech).

---

## Exercício 1: Atualizacao de Versao da API e Validação do Pipeline

Objetivo: Alterar a versao da aplicacao no arquivo server.js para 1.0.1, realizar o commit das alteracoes no Git e executar o script deploy.sh para validar a atualizacao no endpoint /api/v1/versao.

### Passo a Passo de Execucao:

1. Edite o arquivo server.js com a nova versao:
   $ vi server.js

   Ajuste a rota para retornar versao "1.0.1":
   app.get('/api/v1/versao', (req, res) => {
     res.json({
       aplicacao: "API Binário Tech - CI/CD Pipeline",
       versao: "1.0.1",
       ambiente: "Servidor de Homologação Local",
       uptime: process.uptime(),
       timestamp: new Date()
     });
   });

2. Realize o commit das alteracoes no Git local:
   $ git add server.js
   $ git commit -m "feat: atualiza versao da api para 1.0.1"

3. Execute o script de deploy automatizado:
   $ ./deploy.sh

4. Valide a resposta do endpoint formatada em JSON com jq:
   $ curl -s http://127.0.0.1:3002/api/v1/versao | jq .

---

## Exercício 2: Registro de Histórico de Deploy (deploy_history.log)

Objetivo: Incluir uma etapa no script deploy.sh para registrar o historico de deploys bem-sucedidos em um arquivo deploy_history.log, gravando data, hora e o hash curto do commit (git rev-parse --short HEAD).

### Passo a Passo de Execucao:

1. Edite o script deploy.sh utilizando o vi:
   $ vi deploy.sh

   Adicione a gravacao do log apos o sucesso do Smoke Test:
   if [ "$HTTP_STATUS" -eq 200 ]; then
     echo -e "\n[SUCESSO] Deploy realizado e verificado com sucesso! HTTP Status 200."
     
     COMMIT_HASH=$(git rev-parse --short HEAD)
     DATA_HORA=$(date '+%Y-%m-%d %H:%M:%S')
     echo "[$DATA_HORA] Deploy realizado com sucesso - Commit: $COMMIT_HASH" >> deploy_history.log
   else
     ...
   fi

2. Execute o deploy para validar a gravacao do log:
   $ ./deploy.sh

3. Verifique o conteudo do arquivo de historico gerado:
   $ cat deploy_history.log

---

## Exercício 3: Automacao do Pipeline via Git Hook (post-commit)

Objetivo: Configurar um Git Hook do tipo post-commit (.git/hooks/post-commit) que execute automaticamente o script deploy.sh a cada novo commit realizado na branch main.

### Passo a Passo de Execucao:

1. Crie e edite o arquivo de hook com o vi:
   $ vi .git/hooks/post-commit

   Cole o conteudo do script de gatilho:
   #!/bin/bash
   echo -e "\n[GIT HOOK] Novo commit detetado! A disparar pipeline de deploy automatizado..."
   SCRIPT_DIR="$(git rev-parse --show-toplevel)/aula21"
   if [ -f "$SCRIPT_DIR/deploy.sh" ]; then
       bash "$SCRIPT_DIR/deploy.sh"
   fi

2. Conceda permissao de execucao ao arquivo de hook:
   $ chmod +x .git/hooks/post-commit

3. Realize um commit de teste para comprovar a execucao automatica do deploy.sh:
   $ git add server.js
   $ git commit -m "test: valida disparo do git hook post-commit"
