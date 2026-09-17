#!/bin/bash

# teste_seguranca.sh
# Simula tentativas de acesso a rota protegida, com e sem chave de API,
# registrando os resultados em audit_seguranca.log

URL="http://localhost:3000/api/v1/motoristas"
CHAVE_VALIDA="binario-tech-secret-2026"
LOG_FILE="audit_seguranca.log"

echo "===== Auditoria de Seguranca - $(date '+%Y-%m-%d %H:%M:%S') =====" > "$LOG_FILE"

echo "" >> "$LOG_FILE"
echo "--- Tentativas SEM chave de API ---" >> "$LOG_FILE"

for i in 1 2 3
do
  echo "" >> "$LOG_FILE"
  echo ">> Tentativa $i (sem x-api-key)" >> "$LOG_FILE"
  curl -s -o /dev/null -w "Status HTTP: %{http_code}\n" "$URL" >> "$LOG_FILE"
done

echo "" >> "$LOG_FILE"
echo "--- Tentativa COM chave de API valida ---" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"
echo ">> Tentativa 4 (com x-api-key valida)" >> "$LOG_FILE"
curl -s -o /dev/null -w "Status HTTP: %{http_code}\n" -H "x-api-key: $CHAVE_VALIDA" "$URL" >> "$LOG_FILE"

echo "" >> "$LOG_FILE"
echo "===== Fim da auditoria =====" >> "$LOG_FILE"

echo "Teste concluido. Resultados salvos em $LOG_FILE"
