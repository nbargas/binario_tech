Guia de Resolucao - Exercicios de CLI, APIs e Node.js
Este documento contem o passo a passo detalhado para a resolucao dos exercicios praticos envolvendo requisicoes HTTP, manipulacao de JSON com jq, gerenciamento de processos e configuracao de scripts em Node.js.

Sumario
Exercicio 01 - Filtro cURL + jq

Exercicio 02 - Requisicao com HTTPie

Exercicio 03 - Leitura de JSON com jq

Exercicio 04 - Adicionando Nova Rota no Node.js

Exercicio 05 - Configurando npm start

Exercicio 06 - Redirecionamento de Logs

Exercicio 07 - Filtrando Multiplos Campos com jq

Exercicio 08 - Encontrando e Encerrando Processos

Exercicio 01
Objetivo: Efetuar uma requisicao GET para a rota /api/v1/scania usando cURL e filtrar com jq para exibir apenas a chave modelo.

Bash
curl -s http://localhost:3000/api/v1/scania | jq '.modelo'
curl -s: Executa a requisicao HTTP em modo silencioso (oculta a barra de progresso e estatisticas).

| (pipe): Redireciona a saida do comando curl para a entrada do jq.

jq '.modelo': Extrai apenas o valor associado a chave modelo.

Exercicio 02
Objetivo: Fazer uma requisicao GET para /api/v1/mercedes utilizando a ferramenta HTTPie e salvar o resultado em um arquivo.

Bash
http GET http://localhost:3000/api/v1/mercedes > mercedes.json
http GET: Comando do HTTPie para realizar uma requisicao GET.

> mercedes.json: Redirecionador do shell que cria (ou sobrescreve) o arquivo mercedes.json armazenando o corpo da resposta HTTP.

Exercicio 03
Objetivo: Utilizar o jq para ler o arquivo mercedes.json salvo no exercicio anterior e exibir o campo status.

Bash
jq '.status' mercedes.json
jq '.status': Acessa a propriedade status da estrutura JSON.

mercedes.json: Passado como argumento para que o jq leia diretamente o arquivo local.

Exercicio 04
Objetivo: Adicionar uma nova rota /api/v1/volvo no arquivo telemetria.js retornando o modelo FH 540, reiniciar a aplicacao e testar.

Passo 1: Edicao do arquivo telemetria.js
Abra o arquivo telemetria.js no seu editor de texto e insira o trecho de codigo abaixo no bloco de definicao de rotas (assumindo uma estrutura em Express/Node.js):

JavaScript
app.get('/api/v1/volvo', (req, res) => {
  res.json({
    montadora: 'Volvo',
    modelo: 'FH 540',
    status: 'operacional'
  });
});
Passo 2: Reiniciar o servidor
Caso a aplicacao esteja rodando, encerre-a pressionando Ctrl + C no terminal e execute novamente:

Bash
node telemetria.js
Passo 3: Testar a rota criada
Em outro terminal, execute o comando de teste:

Bash
curl -s http://localhost:3000/api/v1/volvo
Exercicio 05
Objetivo: Configurar o arquivo package.json adicionando o script "start": "node telemetria.js" e testar via npm start.

Passo 1: Configurar package.json
Edite a secao "scripts" dentro de package.json para incluir a linha "start":

JSON
{
  "name": "telemetria-app",
  "version": "1.0.0",
  "scripts": {
    "start": "node telemetria.js"
  }
}
Passo 2: Executar o comando de teste
Execute a aplicacao atraves do gerenciador de pacotes NPM:

Bash
npm start
Exercicio 06
Objetivo: Redirecionar o resultado do script de auditoria testar_telemetria.sh para o arquivo relatorio.log.

Bash
./testar_telemetria.sh > relatorio.log 2>&1
./testar_telemetria.sh: Executa o script de auditoria.

>: Redireciona a saida padrao (stdout) para relatorio.log.

2>&1: Redireciona tambem as mensagens de erro (stderr) para a mesma saida, garantindo uma auditoria completa no arquivo de log.

Exercicio 07
Objetivo: Filtrar a resposta da rota /api/v1/vw para exibir apenas os campos montadora e status em uma unica chamada do jq.

Bash
curl -s http://localhost:3000/api/v1/vw | jq '{montadora: .montadora, status: .status}'
{montadora: .montadora, status: .status}: Constroi um novo objeto JSON contendo apenas as chaves especificadas em uma unica chamada.

Sintaxe simplificada alternativa: jq '{montadora, status}'

Exercicio 08
Objetivo: Localizar o PID do processo Node.js em execucao e interrompe-lo via terminal.

Passo 1: Localizar o PID do processo Node.js
Bash
ps aux | grep node
Procure na primeira ou segunda coluna da saida pelo numero que representa o PID referente ao processo node telemetria.js.

Passo 2: Encerrar o processo pelo PID
Substitua <PID> pelo numero identificado (exemplo: 12345):

Bash
kill -9 12345
kill -9: Envia o sinal SIGKILL, forcando o termino imediato do processo no sistema operacional.
