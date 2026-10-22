#!/bin/bash

API_URL="http://localhost:3002/api/v1"
SECRET_KEY="binario-tech-secret-2026"

echo "=========================================="
echo "    AUDITORIA DE SEGURANCA - BINARIO TECH "
echo "=========================================="
echo ""

echo "1. Testando acesso sem header X-API-KEY (deve retornar 401)..."
curl -i -s "$API_URL/motoristas"
echo -e "\n------------------------------------------\n"

echo "2. Testando acesso com chave invalida (deve retornar 401)..."
curl -i -s -H "X-API-KEY: chave-errada" "$API_URL/motoristas"
echo -e "\n------------------------------------------\n"

echo "3. Testando cadastro com CNH invalida (deve retornar 400)..."
curl -i -s -X POST "$API_URL/motoristas" \
  -H "X-API-KEY: $SECRET_KEY" \
  -H "Content-Type: application/json" \
  -d '{"nome": "Teste CNH", "cnh": "123", "categoria": "B"}'
echo -e "\n------------------------------------------\n"

echo "4. Testando acesso a rota inexistente /api/v1/clientes (deve retornar 404)..."
curl -i -s "$API_URL/clientes"
echo -e "\n------------------------------------------\n"

echo "5. Testando consultas e cadastros bem-sucedidos (200 / 201)..."
echo "-> GET /motoristas:"
curl -i -s -H "X-API-KEY: $SECRET_KEY" "$API_URL/motoristas"
echo -e "\n"

echo "-> POST /motoristas:"
curl -i -s -X POST "$API_URL/motoristas" \
  -H "X-API-KEY: $SECRET_KEY" \
  -H "Content-Type: application/json" \
  -d '{"nome": "Carlos Silva", "cnh": "12345678901", "categoria": "D"}'
echo -e "\n"

echo "-> GET /manutencoes:"
curl -i -s -H "X-API-KEY: $SECRET_KEY" "$API_URL/manutencoes"
echo -e "\n"

echo "-> POST /manutencoes:"
curl -i -s -X POST "$API_URL/manutencoes" \
  -H "X-API-KEY: $SECRET_KEY" \
  -H "Content-Type: application/json" \
  -d '{"placa": "ABC1D23", "descricao": "Troca de óleo", "valor": 450}'
echo -e "\n=========================================="
