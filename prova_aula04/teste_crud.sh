#!/bin/bash

# Configuração da URL base
API_URL="http://localhost:3002/api/v1/veiculos"

echo "=================================================="
echo "      AUTOMAÇÃO DE TESTES CRUD - FROTA API"
echo "      Data/Hora: $(date)"
echo "=================================================="
echo ""

echo "--- 1. Cadastrando Veículo 1 (Volvo FH 540) via POST ---"
curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{"placa": "FH540X", "montadora": "Volvo", "modelo": "FH 540", "status": "disponivel"}' | jq .
echo ""

echo "--- 2. Cadastrando Veículo 2 via POST ---"
curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{"placa": "ABC1234", "montadora": "Fiat", "modelo": "Uno", "status": "disponivel"}' | jq .
echo ""

echo "--- 3. Consultando veículos com status DISPONIVEL via GET ---"
curl -s -X GET "$API_URL?status=disponivel" | jq .
echo ""

echo "--- 4. Atualização parcial de status via PATCH (ID: 1) ---"
curl -s -X PATCH "$API_URL/1" \
  -H "Content-Type: application/json" \
  -d '{"status": "manutencao"}' | jq .
echo ""

echo "--- 5. Substituição completa via PUT (ID: 2) ---"
curl -s -X PUT "$API_URL/2" \
  -H "Content-Type: application/json" \
  -d '{"placa": "XYZ9876", "montadora": "Chevrolet", "modelo": "Onix", "status": "disponivel"}' | jq .
echo ""

echo "--- 6. Remoção de 1 veículo via DELETE (ID: 1) ---"
curl -s -i -X DELETE "$API_URL/1"
echo ""

echo "=================================================="
echo "          FIM DA EXECUÇÃO DOS TESTES"
echo "=================================================="
