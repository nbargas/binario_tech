# Resolucao de Exercicios - Aula 20 (Proxy Reverso com Nginx)

Este repositorio contem as solucoes dos 3 exercicios praticos da Aula 20: DevOps, Deploy e Automacao de Infraestrutura (Binario Tech).

---

## Exercício 1: Criar rota com resposta JSON direto pelo Nginx

Objetivo: Configurar um novo bloco location /status-nginx no Nginx que retorne uma resposta personalizada em JSON contendo HTTP Status 200 sem passar pela aplicacao Node.js.

### Passo a Passo de Execucao:

1. Edite a configuracao do Nginx adicionando a rota /status-nginx:
   $ sudo vi /etc/nginx/sites-available/binario_aluno.conf

   Adicione o seguinte bloco no arquivo:
   server {
       listen 8080;
       server_name localhost;

       location /api/v1/proxy/ {
           proxy_pass http://127.0.0.1:3001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'keep-alive';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       }

       # Resposta direta em JSON do Nginx
       location /status-nginx {
           default_type application/json;
           return 200 '{"status": "online", "service": "Nginx Direct Response"}';
       }
   }

2. Remova o site padrao (default), crie o link simbolico e recarregue o Nginx:
   $ sudo rm -f /etc/nginx/sites-enabled/default
   $ sudo ln -sf /etc/nginx/sites-available/binario_aluno.conf /etc/nginx/sites-enabled/
   $ sudo nginx -t
   $ sudo service nginx reload

3. Teste a rota gerada diretamente via curl:
   $ curl -s http://localhost:8080/status-nginx | jq .

---

## Exercício 2: Configurar Limite no Corpo da Requisicao (client_max_body_size)

Objetivo: Adicionar uma regra de limite de tamanho de corpo de requisicao (client_max_body_size 2M;) na configuracao do Nginx para barrar requisicoes com payloads excessivos.

### Passo a Passo de Execucao:

1. Edite a configuracao do Nginx inserindo a diretiva client_max_body_size 2M; dentro do bloco server:
   $ sudo vi /etc/nginx/sites-available/binario_aluno.conf

   Ajuste a estrutura do arquivo para:
   server {
       listen 8080;
       server_name localhost;

       # Limite de payload definido para 2 Megabytes
       client_max_body_size 2M;

       location /api/v1/proxy/ {
           proxy_pass http://127.0.0.1:3001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'keep-alive';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       }

       location /status-nginx {
           default_type application/json;
           return 200 '{"status": "online", "service": "Nginx Direct Response"}';
       }
   }

2. Valide a sintaxe e aplique o reload no Nginx:
   $ sudo nginx -t
   $ sudo service nginx reload

3. Comprove o bloqueio enviando uma requisicao que excede o limite estipulado (retorna HTTP Status 413):
   $ curl -s -X POST -H "Content-Length: 3000000" http://localhost:8080/api/v1/proxy/ -o /dev/null -w '{"http_code": %{http_code}, "mensagem": "413 Payload Excessivo Barrado com Sucesso!"}\n' | jq .

---

## Exercício 3: Script em Bash para Analise de Logs do Nginx com jq

Objetivo: Crie um script Bash chamado analisar_logs_nginx.sh que leia as ultimas 15 linhas do arquivo /var/log/nginx/access.log e filtre apenas requisicoes que retornaram status 200 OK.

### Passo a Passo de Execucao:

1. Crie o arquivo analisar_logs_nginx.sh utilizando o vi:
   $ vi analisar_logs_nginx.sh

   Cole o conteudo abaixo:
   #!/bin/bash

   # Extrai as ultimas 15 linhas do access.log, filtra por status 200 e gera JSON
   sudo tail -n 15 /var/log/nginx/access.log | grep " 200 " | while read -r line; do
     jq -n --arg log "$line" '{"status": 200, "log_entry": $log}'
   done

2. Conceda a permissao de execucao para o script:
   $ chmod +x analisar_logs_nginx.sh

3. Execute o script passando o resultado pelo jq .:
   $ ./analisar_logs_nginx.sh | jq .
