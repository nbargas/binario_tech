#!/bin/bash
echo "==========================================="
echo " AUDITORIA COMPLETA DE ROTAS - BINARIO TECH"
echo "==========================================="
BASE_URL="http://localhost:3000"
LOG_FILE="auditoria.log"
echo "===========================================" > "$LOG_FILE"
echo " AUDITORIA COMPLETA DE ROTAS - BINARIO TECH" >> "$LOG_FILE"
echo " Data: $(date '+%Y-%m-%d %H:%M:%S')" >> "$LOG_FILE"
echo "===========================================" >> "$LOG_FILE"
echo -e "\n[1] Consultando Telemetria Scania..."
R1=$(curl -s http://localhost:3000/api/v1/telemetria/scania)
echo "$R1" | jq '{montadora, total_registros: (.dados | length)}'
{ echo ""; echo "[1] Consultando Telemetria Scania..."; echo "$R1" | jq .; } >> "$LOG_FILE"
echo -e "\n[2] Registrando Telemetria Scania..."
R2=$(curl -s -X POST http://localhost:3000/api/v1/telemetria/scania -H "Content-Type: application/json" -d '{"modelo":"R540","vin":"9BS555444333","temperatura_motor":99}')
echo "$R2" | jq .
{ echo ""; echo "[2] Registrando Telemetria Scania..."; echo "$R2" | jq .; } >> "$LOG_FILE"
echo -e "\n[3] Consultando Telemetria Mercedes-Benz..."
R3=$(curl -s http://localhost:3000/api/v1/telemetria/mercedes)
echo "$R3" | jq '{montadora, total_registros: (.dados | length)}'
{ echo ""; echo "[3] Consultando Telemetria Mercedes-Benz..."; echo "$R3" | jq .; } >> "$LOG_FILE"
echo -e "\n[4] Registrando Telemetria Mercedes-Benz..."
R4=$(curl -s -X POST http://localhost:3000/api/v1/telemetria/mercedes -H "Content-Type: application/json" -d '{"modelo":"Actros 2651","vin":"9BM111222333","temperatura_motor":91}')
echo "$R4" | jq .
{ echo ""; echo "[4] Registrando Telemetria Mercedes-Benz..."; echo "$R4" | jq .; } >> "$LOG_FILE"
echo -e "\n[5] Testando Endpoint Inexistente (404)..."
R5=$(curl -s http://localhost:3000/api/v1/telemetria/inexistente)
echo "$R5" | jq .
{ echo ""; echo "[5] Testando Endpoint Inexistente (404)..."; echo "$R5" | jq .; } >> "$LOG_FILE"
echo "===========================================" >> "$LOG_FILE"
echo " Auditoria concluida." >> "$LOG_FILE"
echo "===========================================" >> "$LOG_FILE"
echo -e "\n==========================================="
echo "Auditoria concluida. Resultados salvos em $LOG_FILE"
echo "==========================================="
