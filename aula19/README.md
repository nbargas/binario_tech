# README - Aula 19: Persistência e Comandos Globais com PM2

Este repositório contém as configurações do ecossistema PM2, scripts de automação e a documentação dos exercícios da Aula 19.

---

## Histórico de Exercícios e Versionamento (Commits e Pushes)

### Exercício 1: Configuração do Ecossistema PM2
* Descrição: Criação do ficheiro ecosystem.config.js para gerir a aplicação api-telemetria em ambiente de produção.
* Ficheiros: ecosystem.config.js
* Comandos Git:
  ```bash
  git add ecosystem.config.js
  git commit -m "aula 19 - exercicio 1"
  git push origin main
Exercício 2: Script de Persistência do PM2
Descrição: Criação do script de salvamento automatizado da lista de processos ativos (pm2 save).

Ficheiros: salvar_pm2.sh

Comandos Git:

Bash
git add salvar_pm2.sh
git commit -m "aula 19 - exercicio 2"
git push origin main
Exercício 3: Criação do Comando Global (bargas pm2)
Descrição: Refatoração e renomeação do script para bargas com validação do argumento pm2, atribuição de permissões (chmod +x) e exportação para o $PATH.

Ficheiros: bargas

Comandos Git:

Bash
git add bargas
git commit -m "aula 19 - exercicio 3"
git push origin main
Exercício 4: Documentação Final e Entrega
Descrição: Criação da documentação das etapas realizadas no README.md e sincronização final com o repositório remoto.

Ficheiros: README.md

Comandos Git:

Bash
git add README.md
git commit -m "aula 19 - exercicio 4"
git push origin main
Teste do Comando Global (bargas pm2)
Para demonstrar o funcionamento do comando em qualquer diretório (exemplo: dentro da diretoria aula16):

Bash
# 1. Exporta o caminho do script para o PATH
export PATH="$PATH:/home/arthur.nunes/binario_tech/aula19"

# 2. Executa a partir de outra pasta
cd ~/binario_tech/aula16
bargas pm2
