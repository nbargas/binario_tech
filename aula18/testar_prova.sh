#!/bin/bash

EMAIL="teste2@email.com"
SENHA="123456"

echo "========================================"
echo "QUESTÃO 1 - CADASTRO"
echo "========================================"

curl -s -X POST http://localhost:3002/api/v1/prova/register \
-H "Content-Type: application/json" \
-d "{\"email\":\"$EMAIL\",\"senha\":\"$SENHA\"}" | jq .

echo ""
echo "========================================"
echo "QUESTÃO 2 - LOGIN"
echo "========================================"

LOGIN=$(curl -s -X POST http://localhost:3002/api/v1/prova/login \
-H "Content-Type: application/json" \
-d "{\"email\":\"$EMAIL\",\"senha\":\"$SENHA\"}")

echo "$LOGIN" | jq .

TOKEN=$(echo "$LOGIN" | jq -r '.token')

echo ""
echo "========================================"
echo "QUESTÃO 3 - RELATÓRIO"
echo "========================================"

curl -s http://localhost:3002/api/v1/prova/relatorio \
-H "Authorization: Bearer $TOKEN" | jq .
