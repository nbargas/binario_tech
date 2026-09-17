const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const usuariosDB = [];

const authController = {
  registrar: async (req, res) => {
    try {
      const { email, senha, perfil } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ mensagem: "Email e senha são obrigatórios." });
      }

      // EXERCÍCIO 3: Validação de senha < 6 caracteres (HTTP 400)
      if (senha.length < 6) {
        return res.status(400).json({ status: "ERRO", mensagem: "A senha deve ter pelo menos 6 caracteres." });
      }

      const usuarioExiste = usuariosDB.find(u => u.email === email);
      if (usuarioExiste) {
        return res.status(400).json({ mensagem: "Usuário já cadastrado." });
      }

      const senhaHash = await bcrypt.hash(senha, 10);
      const novoUsuario = { id: usuariosDB.length + 1, email, senhaHash, perfil: perfil || 'OPERADOR' };
      usuariosDB.push(novoUsuario);

      res.status(201).json({ mensagem: "Usuário registrado com sucesso!", usuarioId: novoUsuario.id });
    } catch (erro) {
      res.status(500).json({ erro: "Erro ao registrar usuário." });
    }
  },

  login: async (req, res) => {
    try {
      const { email, senha } = req.body;

      const usuario = usuariosDB.find(u => u.email === email);
      if (!usuario) {
        return res.status(401).json({ mensagem: "Credenciais inválidas." });
      }

      const senhaValida = await bcrypt.compare(senha, usuario.senhaHash);
      if (!senhaValida) {
        return res.status(401).json({ mensagem: "Credenciais inválidas." });
      }

      // EXERCÍCIO 2: Expiração configurada para 15 segundos ('15s')
      const token = jwt.sign(
        { id: usuario.id, email: usuario.email, perfil: usuario.perfil },
        process.env.JWT_SECRET,
        { expiresIn: '15s' }
      );

      res.status(200).json({ status: "AUTENTICADO", token });
    } catch (erro) {
      res.status(500).json({ erro: "Erro ao realizar login." });
    }
  },

  perfil: (req, res) => {
    res.status(200).json({
      mensagem: "Acesso autorizado à rota protegida!",
      dadosUsuarioLogado: req.usuario
    });
  },

  adminOnly: (req, res) => {
    res.status(200).json({
      mensagem: "Acesso concedido à rota de ADMIN!",
      dadosUsuarioLogado: req.usuario
    });
  }
};

module.exports = authController;
