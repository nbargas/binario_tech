#!/bin/bash
echo ""
echo "=================================================="
echo "   MONITORAMENTO DE LOGS UNIFICADOS - AULA 23"
echo "=================================================="
echo ""

docker compose logs -f --tail=20
