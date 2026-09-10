#!/bin/bash
PORT=3002
BASE_URL="http://localhost:$PORT"

echo "=== 1. Testando Registro de Usuário ==="
curl -X POST "$BASE_URL/auth/registro" \
  -H "Content-Type: application/json" \
  -d '{"nome":"Arthur Bargas","email":"arthur@binariotech.com","senha":"senhaSegura123","perfil":"admin"}'
echo -e "\n"

echo "=== 2. Testando Login e Obtendo Token ==="
RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"arthur@binariotech.com","senha":"senhaSegura123"}')

TOKEN=$(echo $RESPONSE | grep -o '"token":"[^"]*' | grep -o '[^"]*$')
echo "Token recebido: $TOKEN"
echo -e "\n"

echo "=== 3. Acessando Rota Protegida com Token ==="
curl -X GET "$BASE_URL/auth/perfil" \
  -H "Authorization: Bearer $TOKEN"
echo -e "\n"
