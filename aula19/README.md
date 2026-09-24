# README - Aula 19: Persistência e Comandos Globais com PM2

Este repositório contém a documentação e os scripts dos exercícios realizados na Aula 19.

---

## Histórico de Exercícios e Versionamento

### Exercício 1
* Descrição: Criação e execução do script de persistência do PM2.
* Ficheiros: salvar_pm2.sh
* Comandos Git:
  ```bash
  git add salvar_pm2.sh
  git commit -m "aula 19 - exercicio 1"
  git push origin main
Exercício 2
Descrição: Configuração do ecossistema do PM2 para gestão de processos em produção.

Ficheiros: ecosystem.config.js

Comandos Git:

Bash
git add ecosystem.config.js
git commit -m "aula 19 - exercicio 2"
git push origin main
Exercício 3
Descrição: Criação do comando bash global (bargas pm2) com permissões de execução e exportação para o PATH.

Ficheiros: bargas

Comandos Git:

Bash
git add bargas
git commit -m "aula 19 - exercicio 3"
git push origin main
Exercício 4
Descrição: Criação da documentação final no README.md e sincronização do projeto.

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
