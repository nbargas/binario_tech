# Aula 23 - Orquestração de Containers com Docker Compose (Node.js + Redis)

Este repositório contém a resolução prática da **Aula 23**, cobrindo a orquestração de uma API Express (`web-api`) integrada a um cache em memória (`redis-cache`) via Docker Compose.

---

## 🛠️ Arquitetura da Solução

- **API Node.js (`web-api`):** Mapeada na porta do host `8084` para a porta interna `5000`.
- **Servidor Redis (`redis-cache`):** Porta `6379`, operando em rede privada e persitindo dados.
- **Rede Personalizada:** `rede-binario` (driver bridge).
- **Volume Persistente:** `aula23_redis_data` para resiliência dos dados do Redis.

---

## 🚀 Passo a Passo dos Exercícios

### **EXERCÍCIO 1: Adicionar Rota `DELETE /api/v1/visitas/reset`**
**Objetivo:** Criar um endpoint HTTP DELETE para apagar a chave `contador_visitas` no Redis e resetar o contador.

1. Atualizar o ficheiro `server.js` adicionando a rota de eliminação da chave:
   ```javascript
   app.delete('/api/v1/visitas/reset', async (req, res) => {
     try {
       await client.del('contador_visitas');
       res.json({
         status: "SUCESSO",
         mensagem: "Contador de visitas zerado com sucesso no Redis!",
         totalVisitas: 0,
         timestamp: new Date()
       });
     } catch (error) {
       res.status(500).json({ status: "ERRO", mensagem: error.message });
     }
   });
Recompilar e reiniciar o container do serviço web-api:

Bash
docker compose up -d --build web-api
Testar a rota de reset via curl:

Bash
curl -s -X DELETE http://localhost:8084/api/v1/visitas/reset | jq .
Confirmar a reinicialização da contagem executando a rota GET:

Bash
curl -s http://localhost:8084/api/v1/visitas | jq .
EXERCÍCIO 2: Inspecionar o Volume do Redis
Objetivo: Localizar o ponto de montagem (Mountpoint) do volume gerenciado pelo Docker no host Linux.

Executar a inspeção detalhada do volume aula23_redis_data:

Bash
docker volume inspect aula23_redis_data
Extrair diretamente o caminho no sistema de arquivos do host:

Bash
docker volume inspect aula23_redis_data --format '{{ .Mountpoint }}'
Caminho identificado: /var/lib/docker/volumes/aula23_redis_data/_data

EXERCÍCIO 3: Script de Logs Unificados (logs_unificados.sh)
Objetivo: Criar um script Bash para monitorizar em tempo real os logs combinados da API e do Redis.

Criar o ficheiro do script logs_unificados.sh:

Bash
cat << 'EOSH' > logs_unificados.sh
#!/bin/bash
echo ""
echo "=================================================="
echo "   MONITORAMENTO DE LOGS UNIFICADOS - AULA 23"
echo "=================================================="
echo ""

docker compose logs -f --tail=20
EOSH
Conceder permissão de execução ao script:

Bash
chmod +x logs_unificados.sh
Executar o script de monitorização:

Bash
./logs_unificados.sh
(Pressione Ctrl + C para encerrar o acompanhamento dos logs).

