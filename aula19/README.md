Guia de Resolucao - Exercicios Praticos de Gerenciamento de Processos com PM2 e Ecossistema (Aula 19)
Este documento contem o passo a passo detalhado para a resolucao dos exercicios praticos envolvendo o gerenciamento de processos Node.js com PM2, limitacao de uso de memoria, criacao de arquivos de ecossistema (ecosystem.config.js), persistencia de processos no sistema operacional e versionamento com Git.

Sumario
Exercicio 01 - Limitacao de Memoria no PM2 (--max-memory-restart)

Exercicio 02 - Arquivo de Ecossistema do PM2 (ecosystem.config.js)

Exercicio 03 - Persistencia da Lista de Processos do PM2

Exercicio 04 - Commit e Push das Alteracoes da Aula 19

Exercicio 01
Objetivo: Iniciar/configurar o processo api-telemetria no PM2 com limite maximo de memoria estipulado em 100MB utilizando a flag --max-memory-restart 100M.

Comando de Execucao no Terminal:
Bash
pm2 start server.js --name "api-telemetria" --max-memory-restart 100M
Descricao: Caso a aplicacao ultrapasse o consumo de 100MB de RAM, o PM2 realizara a reinicializacao automatica do processo sem interromper o servico de forma definitiva.

Confirmacao de Status:

Bash
pm2 status api-telemetria
Exercicio 02
Objetivo: Criar um arquivo de ecossistema do PM2 (ecosystem.config.js) na pasta da aula19 definindo variaveis de ambiente distintas para os ambientes de Desenvolvimento (env) e Produção (env_production).

Passo 1: Criar o arquivo aula19/ecosystem.config.js
JavaScript
module.exports = {
  apps: [
    {
      name: 'api-telemetria',
      script: './server.js',
      instances: 'max',
      exec_mode: 'cluster',
      max_memory_restart: '100M',
      watch: false,
      
      // Variaveis de ambiente para Desenvolvimento
      env: {
        NODE_ENV: 'development',
        PORT: 3000,
        LOG_LEVEL: 'debug'
      },
      
      // Variaveis de ambiente para Producao
      env_production: {
        NODE_ENV: 'production',
        PORT: 8080,
        LOG_LEVEL: 'info'
      }
    }
  ]
};
Passo 2: Exemplo de Inicializacao via Ecossistema
Em Modo de Desenvolvimento:

Bash
pm2 start ecosystem.config.js
Em Modo de Producao:

Bash
pm2 start ecosystem.config.js --env production
Exercicio 03
Objetivo: Escrever um script/comando em Bash para salvar o estado atual dos processos do PM2 e persistir a lista no boot do sistema operacional (pm2 save).

Comando de Persistencia:
Bash
# Salva a lista de processos ativos atualmente
pm2 save

# (Opcional) Configura a inicializacao automatica do PM2 com o boot do sistema
pm2 startup
Script em Bash (salvar_pm2.sh):
Bash
cat << 'EOF' > salvar_pm2.sh
#!/bin/bash

echo "=== PERSISTINDO CONFIGURACAO DO PM2 ==="
pm2 save

if [ $? -eq 0 ]; then
    echo "Status dos processos salvo com sucesso."
else
    echo "Falha ao salvar configuracao do PM2."
fi
EOF

chmod +x salvar_pm2.sh
./salvar_pm2.sh
Exercicio 04
Objetivo: Realizar o commit e o push das alteracoes da aula19 garantindo que o arquivo de ecossistema e scripts do ambiente estejam versionados no GitHub na branch main.

Passo 1: Adicionar os arquivos alterados/criados ao Stage do Git
Bash
cd ~/binario_tech
git add aula19/
Passo 2: Criar o commit informativo
Bash
git commit -m "feat(aula19): adiciona configuracao de ecossistema PM2 e persistencia de processos"
Passo 3: Enviar as alteracoes para o GitHub
Bash
git push origin main
Passo 4: Confirmar o status limpo da Working Tree
Bash
git status
Saida esperada:

Plaintext
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
