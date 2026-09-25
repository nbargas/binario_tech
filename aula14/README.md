Guia de Resolucao - Exercicios Praticos de Autenticacao JWT, Controle de Acesso e Seguranca em Node.js
Este documento contem o passo a passo detalhado para a resolucao dos exercicios praticos envolvendo Role-Based Access Control (RBAC) com JWT, expiracao de tokens, validacao de complexidade de senhas e tratamento de tokens adulterados/invalidos.

Sumario
Exercicio 01 - Middleware de Autorizacao por Perfil (RBAC)

Exercicio 02 - Configuracao e Teste de Expiracao Curta de JWT

Exercicio 03 - Validacao de Tamanho Minimo de Senha no Registro

Exercicio 04 - Teste com Token Adulterado via cURL

Exercicio 01
Objetivo: Criar um middleware de autorizacao por perfil chamado autorizarPerfil(perfisPermitidos) que receba um array de perfis permitidos (ex: ['ADMIN']) e libere a requisicao apenas se o perfil contido no token JWT (req.usuario.perfil) estiver autorizado.

Passo 1: Criar o arquivo src/middlewares/autorizarPerfil.js
JavaScript
function autorizarPerfil(perfisPermitidos = []) {
  return (req, res, next) => {
    // Verifica se os dados do usuario foram previamente injetados pelo middleware de autenticacao
    if (!req.usuario || !req.usuario.perfil) {
      return res.status(401).json({ erro: 'Nao autorizado. Usuario nao identificado.' });
    }

    const { perfil } = req.usuario;

    // Valida se o perfil do usuario consta na lista de perfis permitidos
    if (!perfisPermitidos.includes(perfil)) {
      return res.status(403).json({
        erro: 'Acesso negado. Voce nao tem permissao para acessar este recurso.'
      });
    }

    next();
  };
}

module.exports = autorizarPerfil;
Passo 2: Exemplo de uso em uma rota protegida (src/routes/adminRoutes.js)
JavaScript
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const autorizarPerfil = require('../middlewares/autorizarPerfil');

// Rota restrita apenas para usuarios com perfil ADMIN
router.delete('/veiculos/:id', authMiddleware, autorizarPerfil(['ADMIN']), (req, res) => {
  res.status(200).json({ mensagem: 'Recurso removido com sucesso por um Administrador.' });
});

module.exports = router;
Exercicio 02
Objetivo: Alterar a expiracao do JWT para 15s (15 segundos) no authController.js, realizar o login e testar o acesso a uma rota protegida apos o tempo expirar.

Passo 1: Ajustar a geracao do token no src/controllers/authController.js
JavaScript
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  // ... simulacao de autenticacao com sucesso
  const payload = { id: 1, email: 'admin@binario.tech', perfil: 'ADMIN' };
  const SECRET_KEY = process.env.JWT_SECRET || 'chave_secreta_jwt';

  // Define a expiracao para 15 segundos
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '15s' });

  return res.status(200).json({ token });
};
Passo 2: Testar a expiracao via cURL
Obter o token executando o login:

Bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@binario.tech", "senha": "123456"}'
Aguardar 16 segundos e tentar acessar a rota protegida com o token gerado:

Bash
curl -i -X GET http://localhost:3000/api/v1/veiculos \
  -H "Authorization: Bearer <SEU_TOKEN_AQUI>"
Retorno esperado do middleware de autenticacao: Cabecalho HTTP/1.1 401 Unauthorized contendo a mensagem de erro de token expirado (jwt expired).

Exercicio 03
Objetivo: Adicionar uma regra de validacao na rota de registro de usuarios impedindo o cadastro de senhas com menos de 6 caracteres, retornando HTTP 400 Bad Request.

Codigo no validador/controller de registro (src/validators/authValidator.js ou authController.js):
JavaScript
const { body, validationResult } = require('express-validator');

const regrasRegistro = [
  body('email')
    .isEmail().withMessage('Informe um e-mail valido'),
  
  body('senha')
    .isLength({ min: 6 }).withMessage('A senha deve conter no minimo 6 caracteres')
];

const validarRegistro = (req, res, next) => {
  const erros = validationResult(req);
  if (!erros.isEmpty()) {
    return res.status(400).json({ erros: erros.array() });
  }
  next();
};

module.exports = { regrasRegistro, validarRegistro };
Teste via cURL com senha curta:
Bash
curl -i -X POST http://localhost:3000/api/v1/auth/registrar \
  -H "Content-Type: application/json" \
  -d '{"email": "usuario@teste.com", "senha": "123"}'
Retorno esperado: HTTP/1.1 400 Bad Request indicando que a senha precisa ter no minimo 6 caracteres.

Exercicio 04
Objetivo: Escrever um comando cURL enviando um token JWT alterado/corrompido manualmente e confirmar a resposta com HTTP Status 403 Forbidden ou 401 Unauthorized.

Teste no terminal via cURL:
Bash
curl -i -X GET http://localhost:3000/api/v1/veiculos \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE2MTYxNjE2fD.TOKEN_INVALIDO_CORROMPIDO"
Retorno esperado do servidor:

HTTP
HTTP/1.1 403 Forbidden
Content-Type: application/json

{
  "erro": "Token invalido ou assinatura adulterada."
}
