#!/bin/bash
echo "=== AUDITORIA DE PROCESSOS NODE.JS - $(date) ===" > aula16/processos.log
ps aux | grep node | grep -v grep >> aula16/processos.log
echo "Processos gravados com sucesso em processos.log"
