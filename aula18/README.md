Guia de Resolucao - Avaliacao Pratica Intermediaria (Aula 18)
Este documento contem o passo a passo detalhado para a resolucao das questoes da Avaliacao Pratica Intermediaria envolvendo autenticacao com Bcryptjs, geracao e verificacao de JWT, protecao de rotas RESTful e automacao de testes E2E via Shell Script com cURL e jq.

Sumario
Questao 01 - Endpoint de Cadastro com Hash de Senha (bcryptjs)

Questao 02 - Endpoint de Login com Geracao de JWT

Questao 03 - Middleware de Protecao JWT e Rota Protegida

Questao 04 - Script Bash de Automacao e Testes E2E

Questao 01
Objetivo: Criar o endpoint POST /api/v1/prova/register que receba email e senha, garantindo que a senha tenha no minimo 6 caracteres e seja salva criptografada em formato Hash utilizando bcryptjs (salt 10).

Passo 1: Criar o Model do Usuario em aula18/src/models/Usuario.js
JavaScript
const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  senha: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Usuario', usuarioSchema);
Passo 2: Criar o Controller em aula18/src/controllers/provaController.js
JavaScript
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');

exports.registrar = async (req, res) => {
  // Valida os erros capturados pelo express-validator
  const erros = validationResult(req);
  if (!erros.isEmpty()) {
    return res.status(400).json({ erros: erros.array() });
  }

  try {
    const { email, senha } = req.body;

    // Verifica se o usuario ja existe
    const usuarioExiste = await Usuario.findOne({ email });
    if (usuarioExiste) {
      return res.status(400).json({ erro: 'E-mail ja cadastrado no sistema.' });
    }

    // Criptografa a senha com salt 10
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    // Cria e salva o novo usuario
    const novoUsuario = await Usuario.create({
      email,
      senha: senhaHash
    });

    return res.status(201).json({
      mensagem: 'Usuario cadastrado com sucesso!',
      id: novoUsuario._id,
      email: novoUsuario.email
    });
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno ao cadastrar usuario.' });
  }
};
Passo 3: Configurar a Rota e Validador em aula18/src/routes/provaRoutes.js
JavaScript
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const provaController = require('../controllers/provaController');

// Regras de validacao do cadastro
const regrasRegistro = [
  body('email').isEmail().withMessage('Forneca um e-mail valido.'),
  body('senha').isLength({ min: 6 }).withMessage('A senha deve conter no minimo 6 caracteres.')
];

router.post('/register', regrasRegistro, provaController.registrar);

module.exports = router;
Questao 02
Objetivo: Criar o endpoint POST /api/v1/prova/login que valide as credenciais. Caso estejam corretas, devolver um Token JWT contendo o id e email do usuario com expiracao de 30 minutos (30m).

Passo 1: Implementar a funcao de Login no Controller aula18/src/controllers/provaController.js
JavaScript
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: 'E-mail e senha sao obrigatorios.' });
    }

    // Busca o usuario pelo e-mail
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ erro: 'Credenciais invalidas.' });
    }

    // Compara a senha informada com o Hash do banco de dados
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ erro: 'Credenciais invalidas.' });
    }

    // Gera o token JWT valido por 30 minutos
    const payload = { id: usuario._id, email: usuario.email };
    const SECRET_KEY = process.env.JWT_SECRET || 'binario_tech_chave_oficial_exame_2026';
    
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '30m' });

    return res.status(200).json({
      mensagem: 'Login realizado com sucesso!',
      token
    });
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno ao realizar login.' });
  }
};
Passo 2: Adicionar a rota no arquivo aula18/src/routes/provaRoutes.js
JavaScript
router.post('/login', provaController.login);
Questao 03
Objetivo: Criar o middleware validarJWT.js e aplica-lo na rota protegida GET /api/v1/prova/relatorio. Se o token for omitido, retornar HTTP Status 401 Unauthorized. Se for invalido ou adulterado, retornar HTTP Status 403 Forbidden.

Passo 1: Criar o Middleware aula18/src/middlewares/validarJWT.js
JavaScript
const jwt = require('jsonwebtoken');

function validarJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  // Se o cabecalho Authorization nao for enviado (HTTP 401)
  if (!authHeader) {
    return res.status(401).json({ erro: 'Acesso negado. Token nao fornecido.' });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ erro: 'Formato do cabeçalho de autorizacao invalido.' });
  }

  const token = parts[1];
  const SECRET_KEY = process.env.JWT_SECRET || 'binario_tech_chave_oficial_exame_2026';

  // Verifica a validade e integridade do token (HTTP 403 em caso de erro)
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ erro: 'Token invalido ou expirado.' });
    }

    req.usuario = decoded;
    next();
  });
}

module.exports = validarJWT;
Passo 2: Implementar o Relatorio no Controller aula18/src/controllers/provaController.js
JavaScript
exports.relatorio = (req, res) => {
  return res.status(200).json({
    status: 'SUCESSO',
    mensagem: 'Relatorio da avaliacao gerado com sucesso!',
    usuarioAutenticado: req.usuario,
    timestamp: new Date()
  });
};
Passo 3: Aplicar o Middleware na Rota Protegida em aula18/src/routes/provaRoutes.js
JavaScript
const validarJWT = require('../middlewares/validarJWT');

router.get('/relatorio', validarJWT, provaController.relatorio);
Questao 04
Objetivo: Criar o script Bash testar_prova.sh na pasta aula18 que cadastre um usuario, efetue o login, armazene o token retornado em uma variavel e acesse a rota protegida exibindo o resultado formatado no terminal via jq.

Passo 1: Criar o arquivo aula18/testar_prova.sh
Bash
cat << 'EOF' > testar_prova.sh
#!/bin/bash

BASE_URL="http://localhost:3000/api/v1/prova"
EMAIL_TESTE="aluno_prova_$(date +%s)@binario.tech"
SENHA_TESTE="senha123"

echo "================================================="
echo "=== EXECUTANDO TESTES DA AVALIACAO PRATICA ==="
echo "================================================="

echo -e "\n1. Cadastrando novo usuario ($EMAIL_TESTE)..."
curl -s -X POST "$BASE_URL/register" \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"$EMAIL_TESTE\", \"senha\": \"$SENHA_TESTE\"}" | jq '.'

echo -e "\n2. Realizando login e capturando Token JWT..."
RESPONSE_LOGIN=$(curl -s -X POST "$BASE_URL/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"$EMAIL_TESTE\", \"senha\": \"$SENHA_TESTE\"}")

TOKEN=$(echo $RESPONSE_LOGIN | jq -r '.token')

if [ "$TOKEN" == "null" ] || [ -z "$TOKEN" ]; then
    echo "FALHA: Nao foi possivel obter o token JWT."
    exit 1
fi

echo "Token obtido com sucesso: ${TOKEN:0:25}..."

echo -e "\n3. Acessando rota protegida (/relatorio) com o Token..."
curl -s -X GET "$BASE_URL/relatorio" \
  -H "Authorization: Bearer $TOKEN" | jq '.'

echo -e "\n================================================="
echo "=== TESTES FINALIZADOS COM SUCESSO ==="
echo "================================================="
EOF
Passo 2: Conceder Permissao de Execucao e Testar
Bash
chmod +x testar_prova.sh
./testar_prova.sh
