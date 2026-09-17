const autorizarPerfil = (perfisPermitidos) => {
  return (req, res, next) => {
    if (!req.usuario || !perfisPermitidos.includes(req.usuario.perfil)) {
      return res.status(403).json({ 
        status: "ERRO", 
        mensagem: "Acesso proibido. Seu perfil não tem permissão para acessar esta rota." 
      });
    }
    next();
  };
};

module.exports = autorizarPerfil;
