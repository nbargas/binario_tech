Binario Tech - Desenvolvimento Web, APIs e Automação Backend
Repositório central para armazenamento, documentação e versionamento dos projetos, exercícios práticos, microserviços em Node.js/Express, scripts de automação em Bash e manipulação avançada de dados desenvolvidos ao longo do programa Binario Tech.

Sobre o Repositório
Este espaço consolida a evolução prática em arquitetura de software backend, infraestrutura em ambiente Linux, construção de APIs RESTful e integração de sistemas. O objetivo principal é documentar a implementação de conceitos fundamentais e avançados de desenvolvimento, servindo como base de conhecimento e portfólio técnico.

Principais Objetivos do Projeto
Construção e estruturação de APIs RESTful utilizando Node.js e Express.js

Automação de rotinas de infraestrutura e testes de rede via Shell Script/Bash

Manipulação, parsing e extração de dados JSON no terminal com jq

Gerenciamento de variáveis de ambiente e configurações de dependências com NPM

Práticas de controle de versão, resolução de conflitos e fluxos de trabalho no Git/GitHub

Tecnologias e Ferramentas
Backend e Runtime
Node.js - Ambiente de execução JavaScript no servidor

Express.js - Framework para construção de roteamento e serviços HTTP

NPM (Node Package Manager) - Gestão de pacotes e scripts do projeto

Infraestrutura, CLI e Automação
Bash / Shell Scripting - Scripts executáveis para testes e automação de tarefas

cURL e HTTPie - Clientes HTTP em linha de comando para consumo de APIs

jq - Processador JSON via terminal para extração e filtragem de dados

netstat / ss - Diagnóstico de rede, verificação de portas e sockets ativos

Versionamento e Ambiente
Linux / Google Cloud Shell - Ambiente de desenvolvimento distribuído

Git e GitHub - Controle de versão e gestão de repositório remoto

Estrutura do Repositório
Plaintext
.
├── aula01/                 # Introdução ao Linux, comandos de terminal e navegação CLI
├── aula02/                 # Servidor Express, rotas HTTP (/status, /scania/info, /vw/info), 
│                           # exportação de JSON e script de testes automatizados (testar_servidor.sh)
├── aula03/                 # Gerenciamento de estado, middlewares e parâmetros de requisição
├── aula04/                 # Persistência de dados e integração com serviços externos
├── ...                     # Próximos módulos do programa de formação
└── README.md               # Documentação principal e guia do repositório
Guia de Instalação e Execução
Pré-requisitos
Para executar qualquer um dos módulos do repositório localmente, certifique-se de possuir instalado:

Node.js (versão 18.x ou superior)

Git

Utilitários do sistema: bash, curl, jq

Passo a Passo
Clone o repositório remoto:
git clone https://github.com/nbargas/Binario_Tech.git

Entre no diretório do projeto:
cd Binario_Tech

Acesse o módulo desejado (exemplo: aula02):
cd aula02

Instale as dependências necessárias do módulo:
npm install

Execute a aplicação principal:
node servidor.js

Testes e Automação
Os módulos contam com scripts de automação em Bash para validação de endpoints e simulação de tráfego de rede.

Executando Testes Automatizados (Exemplo Aula 02)
Garanta que o servidor esteja em execução em um terminal.

Em outra janela do terminal, conceda permissão de execução ao script:
chmod +x testar_servidor.sh

Execute a suíte de testes:
./testar_servidor.sh

O script realizará requisições sequenciais aos endpoints configurados, validando a disponibilidade do serviço e exibindo os registros de saída com timestamp em tempo real.

Autor
Desenvolvido por Arthur Bargas

GitHub: https://github.com/nbargas

Repositório: https://github.com/nbargas/Binario_Tech
