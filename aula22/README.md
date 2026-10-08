# Resolucao de Exercicios - Aula 22 (Conteinerizacao com Docker)

Este repositorio contem as solucoes dos 3 exercicios praticos da Aula 22: DevOps, Deploy e Automacao de Infraestrutura (Binario Tech).

---

## Exercício 1: Criacao de Nova Tag para Imagem Docker

Objetivo: Criar uma nova tag da imagem Docker chamada binario-tech/api-docker:latest a partir da imagem existente utilizando o comando docker tag.

### Passo a Passo de Execucao:

1. Crie a tag latest para a imagem existente:
   $ docker tag binario-tech/api-docker:1.0 binario-tech/api-docker:latest

2. Verifique o mapeamento das tags e IDs das imagens:
   $ docker images binario-tech/api-docker

---

## Exercício 2: Execucao de Container em Ambiente de Homologacao (HML)

Objetivo: Executar um segundo container em background chamado container-telemetria-hml, mapeando a porta host 8083 para a porta interna 4000 e passando a variavel de ambiente NODE_ENV=homologacao.

### Passo a Passo de Execucao:

1. Suba o container de homologacao em segundo plano:
   $ docker run -d \
       --name container-telemetria-hml \
       -p 8083:4000 \
       -e NODE_ENV=homologacao \
       binario-tech/api-docker:latest

2. Valide o funcionamento e as variaveis de ambiente da API no container:
   $ curl -s http://localhost:8083/api/v1/container/info | jq .

---

## Exercício 3: Script Bash para Limpeza de Ambiente Docker

Objetivo: Escrever um script Bash chamado limpar_ambiente_docker.sh para parar/remover containers inativos e limpar imagens pendentes (dangling images) utilizando filtros do Docker CLI.

### Passo a Passo de Execucao:

1. Crie e edite o script limpar_ambiente_docker.sh:
   $ vi limpar_ambiente_docker.sh

   Cole a estrutura do script:
   #!/bin/bash
   echo "=================================================="
   echo "    LIMPEZA DE AMBIENTE DOCKER - BINÁRIO TECH"
   echo "=================================================="

   echo "[1/2] Removendo containers inativos/parados..."
   docker container prune -f

   echo -e "\n[2/2] Removendo imagens pendentes/sem tag (dangling=true)..."
   docker image prune -f --filter "dangling=true"

   echo -e "\n[OK] Limpeza do ambiente Docker concluída com sucesso!"
   echo "=================================================="

2. Conceda permissao de execucao ao script:
   $ chmod +x limpar_ambiente_docker.sh

3. Execute o script de limpeza no terminal:
   $ ./limpar_ambiente_docker.sh
