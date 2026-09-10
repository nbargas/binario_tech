const autorizarPerfil = (perfisPermitidos) => {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({ status: "ERRO", mensagem: "Usuário não autenticado." });
    }

    if (!perfisPermitidos.includes(req.usuario.perfil)) {
      return res.status(403).json({
        status: "ERRO",
        mensagem: "Acesso negado. Perfil sem permissão para este recurso."
      });
    }

    next();
  };
};

module.exports = autorizarPerfil;
