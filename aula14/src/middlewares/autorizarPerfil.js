module.exports = (perfisPermitidos) => {
  return (req, res, next) => {
    if (!req.usuarioLogado || !perfisPermitidos.includes(req.usuarioLogado.perfil)) {
      return res.status(403).json({
        status: "ERRO",
        mensagem: "Acesso proibido. Seu perfil não tem permissão para acessar esta rota."
      });
    }
    next();
  };
};
