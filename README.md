Este módulo integra o repositório central **Binario Tech** e documenta as práticas avançadas de persistência de processos, gestão de ecossistemas de produção com PM2, criação de scripts Bash executáveis e exportação de utilitários globais via `$PATH` no ambiente Linux.

---

## Sobre a Aula 19

A Aula 19 foca na automatização da infraestrutura backend e na garantia de alta disponibilidade de aplicações Node.js. Os exercícios práticos abrangem a configuração de arquivos de ecossistema para ambientes de produção, persistência de processos ativos e a construção de ferramentas de linha de comando (CLI) acessíveis globalmente pelo sistema operacional.

---

## Estrutura dos Exercícios e Versionamento

### Exercício 1: Persistência do PM2
* **Descrição:** Construção da aplicação base em Node.js/Express e criação do script de automação (`salvar_pm2.sh`) responsável por salvar e restaurar a lista de processos ativos do PM2 (`pm2 save` / `pm2 resurrect`).
* **Ficheiros:** `salvar_pm2.sh`, `server.js`, `package.json`
* **Comando de Versionamento:**
  ```bash
  git add .
  git commit -m "aula 19 - exercicio 1"
  git push origin main
Exercício 2: Ecossistema de Produção PM2
Descrição: Elaboração do ficheiro de configuração ecosystem.config.js para padronizar variáveis de ambiente, logs e limites de memória da aplicação api-telemetria gerenciada pelo PM2.

Ficheiros: ecosystem.config.js

Comando de Versionamento:

Bash
git add ecosystem.config.js
git commit -m "aula 19 - exercicio 2"
git push origin main
Exercício 3: Utilitário Bash e Exportação Global
Descrição: Refatoração do script de automação para o utilitário bargas, aplicação de permissões de execução (chmod +x) e exportação da diretoria para a variável de ambiente $PATH, viabilizando o disparo do comando bargas pm2 de qualquer diretório do sistema.

Ficheiros: bargas

Comando de Versionamento:

Bash
git add bargas
git commit -m "aula 19 - exercicio 3"
git push origin main
Exercício 4: Documentação e Sincronização
Descrição: Consolidação da documentação técnica no README.md da aula19, revisão do fluxo de entregas e sincronização final com o repositório remoto.

Ficheiros: README.md

Comando de Versionamento:

Bash
git add README.md
git commit -m "aula 19 - exercicio 4"
git push origin main
Guia de Execução e Testes
Pré-requisitos
PM2 instalado globalmente (npm install -g pm2)

Permissões de execução atribuídas ao script bargas (chmod +x bargas)

Testando o Comando Global (bargas pm2)
Para validar a execução do utilitário em qualquer diretório do sistema Linux:

Bash
# 1. Adicionar o diretório da aula19 à variável PATH da sessão atual
export PATH="$PATH:/home/arthur.nunes/binario_tech/aula19"

# 2. Navegar para outro módulo do repositório (exemplo: aula16)
cd ~/binario_tech/aula16

# 3. Executar o comando global
bargas pm2
Autor
Desenvolvido por Arthur Bargas

GitHub: https://github.com/nbargas

Repositório: https://github.com/nbargas/Binario_Tech


