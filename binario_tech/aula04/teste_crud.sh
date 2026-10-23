#!/bin/bash
BASE_URL="http://localhost:3000/api/v1/veiculos"
LOG_FILE="crud_result.log"

echo "=== Execucao iniciada em $(date '+%Y-%m-%d %H:%M:%S') ===" > "$LOG_FILE"

log() {
  echo -e "$1" | tee -a "$LOG_FILE"
}

log "\n[1] Cadastrando veiculo 1 (Volvo FH 540)..."
RESP1=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X POST "$BASE_URL" \
  -H "Content-Type: application/json" \
  -d '{"placa":"KLL-9090","montadora":"Volvo","modelo":"FH 540"}')
BODY1=$(echo "$RESP1" | sed -e 's/HTTP_STATUS\:.*//g')
STATUS1=$(echo "$RESP1" | tr -d '\n' | sed -e 's/.*HTTP_STATUS://')
ID1=$(echo "$BODY1" | grep -o '"id":[0-9]*' | head -1 | grep -o '[0-9]*')
log "Resposta: $BODY1"
log "Status HTTP: $STATUS1"
if [ "$STATUS1" != "201" ]; then
  log "[ERRO] Cadastro do veiculo 1 falhou. Abortando script."
  exit 1
fi
log "[OK] Veiculo 1 cadastrado com ID $ID1"

log "\n[2] Cadastrando veiculo 2 (Scania R450)..."
RESP2=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X POST "$BASE_URL" \
  -H "Content-Type: application/json" \
  -d '{"placa":"XYZ-1122","montadora":"Scania","modelo":"R450"}')
BODY2=$(echo "$RESP2" | sed -e 's/HTTP_STATUS\:.*//g')
STATUS2=$(echo "$RESP2" | tr -d '\n' | sed -e 's/.*HTTP_STATUS://')
ID2=$(echo "$BODY2" | grep -o '"id":[0-9]*' | head -1 | grep -o '[0-9]*')
log "Resposta: $BODY2"
log "Status HTTP: $STATUS2"
if [ "$STATUS2" != "201" ]; then
  log "[ERRO] Cadastro do veiculo 2 falhou. Abortando script."
  exit 1
fi
log "[OK] Veiculo 2 cadastrado com ID $ID2"

log "\n[3] Atualizando veiculo ID $ID1 para status EM_ROTA..."
RESP3=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X PATCH "$BASE_URL/$ID1/status" \
  -H "Content-Type: application/json" \
  -d '{"status":"EM_ROTA"}')
BODY3=$(echo "$RESP3" | sed -e 's/HTTP_STATUS\:.*//g')
STATUS3=$(echo "$RESP3" | tr -d '\n' | sed -e 's/.*HTTP_STATUS://')
log "Resposta: $BODY3"
log "Status HTTP: $STATUS3"
if [ "$STATUS3" == "200" ]; then
  log "[OK] Veiculo ID $ID1 atualizado com sucesso."
else
  log "[ERRO] Falha ao atualizar veiculo ID $ID1."
fi

log "\n[4] Deletando veiculo ID $ID2..."
RESP4=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X DELETE "$BASE_URL/$ID2")
STATUS4=$(echo "$RESP4" | tr -d '\n' | sed -e 's/.*HTTP_STATUS://')
log "Status HTTP: $STATUS4"
if [ "$STATUS4" == "200" ] || [ "$STATUS4" == "204" ]; then
  log "[OK] Veiculo ID $ID2 deletado com sucesso."
else
  log "[ERRO] Falha ao deletar veiculo ID $ID2."
fi

log "\n=== Resumo ==="
log "Veiculo cadastrado e atualizado: ID $ID1"
log "Veiculo cadastrado e deletado:   ID $ID2"
log "=== Execucao finalizada em $(date '+%Y-%m-%d %H:%M:%S') ==="
