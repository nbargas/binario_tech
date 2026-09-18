const checkContentType = (req, res, next) => {
  if (req.method === 'POST' && req.headers['content-type'] !== 'application/json') {
    return res.status(400).json({
      status: "ERRO_CONTENT_TYPE",
      mensagem: "O cabeçalho Content-Type deve ser application/json para requisições POST."
    });
  }
  next();
};

module.exports = checkContentType;
