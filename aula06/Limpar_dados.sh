#!/bin/bash
echo "=================================================="
echo " RESET DO AMBIENTE DE TESTES - BINÁRIO TECH"
echo "=================================================="

echo -e "\n[1] Encerrando processo Node.js (ocorrencias_api.js)..."
if pgrep -f "node ocorrencias_api.js" > /dev/null; then
        pkill -f "node ocorrencias_api.js"
        echo "Processo encerrado com sucesso."
else
        echo "Nenhum processo em execução encontrado."
fi

echo -e "\n[2] Removendo arquivo ocorrencias.json..."
if [ -f "ocorrencias.json" ]; then
        rm -f ocorrencias.json
        echo "Arquivo ocorrencias.json removido com sucesso."
else
        echo "Arquivo ocorrencias.json não encontrado."
fi

echo -e "\n=================================================="
echo " AMBIENTE RESETADO"
echo "=================================================="
