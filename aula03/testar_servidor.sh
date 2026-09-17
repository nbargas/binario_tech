#!/bin/bash

BASE_URL="http://localhost:3001"
ROTAS=("/api/v1/scania" "/vw/info" "/api/v1/mercedes")

for rota in "${ROTAS[@]}"; do
  echo "=========================================="
  echo "Testando rota: $rota"
  echo "Horário: $(date '+%Y-%m-%d %H:%M:%S')"
  echo "------------------------------------------"
  curl -s "$BASE_URL$rota" | jq .
  echo ""
done

echo "=========================================="
echo "Testes concluídos."
