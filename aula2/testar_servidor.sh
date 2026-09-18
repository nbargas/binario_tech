#!/bin/bash

echo "--- TESTE DE ROTAS [$(date +'%H:%M:%S')] ---"

echo "1. Testando /status..."
curl -s http://localhost:3000/status
echo -e "\n"

echo "2. Testando /scania/info..."
curl -s http://localhost:3000/scania/info
echo -e "\n"

echo "3. Testando /vw/info..."
curl -s http://localhost:3000/vw/info
echo -e "\n"

echo "--- FIM DOS TESTES ---"
