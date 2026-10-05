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
