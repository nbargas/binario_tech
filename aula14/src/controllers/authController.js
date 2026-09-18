const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const usuarios = [];
const JWT_SECRET = process.env.JWT_SECRET || 'chave_secreta_binario_tech';

exports.register = async (req, res) => {
  const { email, senha, perfil } = req.body;

  if (!senha || senha.length < 6) {
    return res.status(400).json({
      status: "ERRO",
      mensagem: "A senha deve ter pelo menos 6 caracteres."
    });
  }

  const senhaCriptografada = await bcrypt.hash(senha, 10);
  const novoUsuario = { id: usuarios.length + 1, email, senha: senhaCriptografada, perfil: perfil || 'OPERADOR' };
  usuarios.push(novoUsuario);

  res.status(201).json({ status: "SUCESSO", mensagem: "Usuário registrado!", usuarioId: novoUsuario.id });
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;
  const usuario = usuarios.find(u => u.email === email);

  if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
    return res.status(401).json({ status: "ERRO", mensagem: "Credenciais inválidas." });
  }

  const token = jwt.sign(
    { id: usuario.id, email: usuario.email, perfil: usuario.perfil },
    JWT_SECRET,
    { expiresIn: '15s' }
  );

  res.json({ status: "SUCESSO", token });
};

exports.perfil = (req, res) => {
  res.json({ mensagem: "Acesso autorizado à rota protegida!", dadosUsuarioLogado: req.usuarioLogado });
};

exports.rotaAdmin = (req, res) => {
  res.json({ mensagem: "Acesso concedido à rota de ADMIN!", dadosUsuarioLogado: req.usuarioLogado });
};
