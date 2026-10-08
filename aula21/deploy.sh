#!/bin/bash
echo "=================================================="
echo "    PIPELINE DE DEPLOY AUTOMATIZADO - BINÁRIO TECH"
echo "=================================================="

REPO_DIR="$HOME/binario_tech"
APP_NAME="api-cicd"
PORT=3002

echo "[1/4] Atualizando código-fonte do repositório remoto..."
cd $REPO_DIR
git pull origin main

echo "[2/4] Verificando e instalando novas dependências..."
cd $REPO_DIR/aula21
npm install --omit=dev

echo "[3/4] Reiniciando aplicação..."
pkill -f "node server.js" 2>/dev/null
nohup node server.js > server.log 2>&1 &

echo "[4/4] Executando Smoke Test na API (Porta $PORT)..."
sleep 3
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:$PORT/api/v1/versao)

if [ "$HTTP_STATUS" -eq 200 ]; then
  echo -e "\n[SUCESSO] Deploy realizado e verificado com sucesso! HTTP Status 200."
  
  # EXERCÍCIO 2: Registrar histórico de deploy
  COMMIT_HASH=$(git rev-parse --short HEAD)
  DATA_HORA=$(date '+%Y-%m-%d %H:%M:%S')
  echo "[$DATA_HORA] Deploy realizado com sucesso - Commit: $COMMIT_HASH" >> deploy_history.log
else
  echo -e "\n[FALHA] Smoke Test falhou com status $HTTP_STATUS! Verifique os logs."
  cat server.log
  exit 1
fi
echo "=================================================="
