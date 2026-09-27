Guia de Resolucao - Exercicios Praticos de Sincronizacao Git, Gitignore, Scripts Shell e Deploy no GitHub
Este documento contem o passo a passo detalhado para a resolucao dos exercicios praticos envolvendo sincronizacao de alteracoes via Git (git pull), configuracao de regras globais do .gitignore, criacao de scripts Shell para auditoria de processos no servidor Linux e envio de atualizacoes de codigo para o repositorio remoto no GitHub.

Sumario
Exercicio 01 - Sincronizacao de Alteracoes Remotas via Git

Exercicio 02 - Criacao do Arquivo .gitignore Global do Projeto

Exercicio 03 - Script Bash de Auditoria de Processos Node.js

Exercicio 04 - Commit e Publicacao da Aula 16 no GitHub

Exercicio 01
Objetivo: Atualizar o repositorio local no servidor da sala de aula trazendo as alteracoes enviadas a partir do Google Cloud Shell via git pull origin main.

Passo 1: Executar a sincronizacao no terminal do servidor
Bash
git pull origin main
Passo 2: Confirmar o status e a atualizacao dos arquivos
Bash
git status
ls -la
Validacao: O terminal deve exibir a mensagem Already up to date. ou detalhar a lista de arquivos atualizados pela mesclagem.

Exercicio 02
Objetivo: Criar um arquivo .gitignore na raiz do diretorio binario_tech para evitar o rastreamento das pastas node_modules e dos arquivos .env de todas as aulas.

Passo 1: Criar/Editar o arquivo .gitignore na raiz do projeto
Bash
cat << 'EOF' > .gitignore
# Dependencias do Node.js
**/node_modules/
node_modules/

# Arquivos de variaveis de ambiente
**/.env
.env

# Logs do sistema e npm
*.log
npm-debug.log*

# Banco de dados local SQLite
*.sqlite
*.db
EOF
Passo 2: Verificar os arquivos ignorados pelo Git
Bash
git status
Validacao: As pastas node_modules e arquivos .env nao devem mais aparecer na secao de Untracked files.

Exercicio 03
Objetivo: Criar o script Bash auditoria_servidor.sh que mapeie os processos Node.js em execucao no servidor (ps aux | grep node) e salve o resultado no arquivo processos.log.

Passo 1: Criar o script auditoria_servidor.sh
Bash
cat << 'EOF' > auditoria_servidor.sh
#!/bin/bash

echo "=== AUDITORIA DE PROCESSOS NODE.JS ===" > processos.log
date >> processos.log
echo "--------------------------------------" >> processos.log

# Captura e grava a lista de processos aticos
ps aux | grep node | grep -v grep >> processos.log

echo "--------------------------------------" >> processos.log
echo "Auditoria concluida com sucesso." >> processos.log
EOF
Passo 2: Conceder permissao de execucao e executar o script
Bash
chmod +x auditoria_servidor.sh
./auditoria_servidor.sh
Passo 3: Visualizar o log gerado
Bash
cat processos.log
Exercicio 04
Objetivo: Adicionar os novos arquivos, realizar o commit do script auditoria_servidor.sh juntamente com a estrutura da aula16 e enviar para o repositorio remoto no GitHub.

Passo 1: Adicionar os arquivos ao Stage do Git
Bash
git add .gitignore auditoria_servidor.sh aula16/
Passo 2: Realizar o commit das alteracoes
Bash
git commit -m "feat(aula16): adiciona script de auditoria de servidor e atualiza .gitignore"
Passo 3: Enviar as atualizacoes para o GitHub
Bash
git push origin main
Passo 4: Validacao na Interface Web do GitHub
Acesse o seu repositorio no GitHub via navegador.

Navegue ate a raiz e confirme a presenca da pasta aula16 e do arquivo auditoria_servidor.sh.

Confirme que nem arquivos .env nem pastas node_modules foram subidos para o repositorio remoto.
