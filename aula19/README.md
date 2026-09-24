# README - Aula 19: Persistência e Comandos Globais com PM2

Este repositório contém a documentação e os scripts dos exercícios realizados na Aula 19.

---

## Histórico de Exercícios e Versionamento

### Exercício 1
* Descrição: Aplicação base e script de automação de processos PM2.
* Ficheiros: server.js, package.json, salvar_pm2.sh
* Comandos Git:
  ```bash
  git add .
  git commit -m "aula 19 - exercicio 1"
  git push origin main
Exercício 2
Descrição: Configuração do ficheiro de ecossistema do PM2 em ambiente de produção.

Ficheiros: ecosystem.config.js

Comandos Git:

Bash
git add ecosystem.config.js
git commit -m "aula 19 - exercicio 2"
git push origin main
Exercício 3
Descrição: Criação do comando bash global (bargas pm2) com permissões de execução e inclusão no PATH.

Ficheiros: bargas

Comandos Git:

Bash
git add bargas
git commit -m "aula 19 - exercicio 3"
git push origin main
Exercício 4
Descrição: Criação da documentação final no README.md e sincronização do projeto no GitHub.

Ficheiros: README.md

Comandos Git:

Bash
git add README.md
git commit -m "aula 19 - exercicio 4"
git push origin main
Teste do Comando Global (bargas pm2)
Para demonstrar o funcionamento do comando em qualquer diretório:

Bash
# 1. Exporta o caminho do script para o PATH
export PATH="$PATH:/home/arthur.nunes/binario_tech/aula19"

# 2. Executa a partir de outra pasta
cd ~/binario_tech/aula16
bargas pm2
