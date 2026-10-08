#!/bin/bash
echo "=================================================="
echo "    AUDITORIA DE LOGS NGINX - REQUISIÇÕES 200 OK   "
echo "=================================================="

# Lê as últimas 15 linhas do log de acesso e filtra por requisições com código 200
sudo tail -n 15 /var/log/nginx/access.log | grep " 200 "

echo "=================================================="
