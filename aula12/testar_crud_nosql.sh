#!/bin/bash
echo "===================================================="
echo " AUDITORIA DE CRUD E SUBDOCUMENTOS NOSQL - AULA 12"
echo "===================================================="

echo -e "\n[1] Registrando Manutencao com Subdocumentos de Pecas..."
RESP=$(curl -s -X POST http://localhost:3000/api/v1/manutencoes -H "Content-Type: application/json" -d '{"veiculoPlaca": "SCA-2026", "tipoManutencao": "PREVENTIVA", "custoTotal": 1500.00, "pecasSubstituidas": [{"nomePeca": "Filtro de Oleo", "quantidade": 2, "custoUnitario": 150.00}, {"nomePeca": "Oleo do Motor 15W40", "quantidade": 1, "custoUnitario": 1200.00}]}')
echo $RESP | jq .

ID=$(echo $RESP | jq -r '._id')

echo -e "\n[2] Consultando manutencoes com Custo Maior ou Igual a R$ 1000 (\$gte)..."
curl -s "http://localhost:3000/api/v1/manutencoes?minCusto=1000" | jq .

echo -e "\n[3] Atualizando Status da Manutencao (ID: $ID) para CONCLUIDA..."
curl -s -X PATCH "http://localhost:3000/api/v1/manutencoes/$ID/status" -H "Content-Type: application/json" -d '{"status": "CONCLUIDA"}' | jq .
