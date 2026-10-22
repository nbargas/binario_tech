const authMiddleware = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];


  if (!apiKey || apiKey !== 'binario-tech-secret-2026') {
    return res.status(401).json({ erro: 'Não autorizado: Chave de API inválida ou ausente.' });
  }


  next();
};


module.exports = authMiddleware;
