// middlewares/validaCnh.js

function validaCnh(req, res, next) {
  const { cnh } = req.body;

  if (!cnh) {
    return res.status(400).json({
      erro: 'CNH obrigatória',
      mensagem: 'O campo "cnh" deve ser informado no corpo da requisição.'
    });
  }

  const regexCnh = /^\d{11}$/;

  if (!regexCnh.test(cnh)) {
    return res.status(400).json({
      erro: 'CNH inválida',
      mensagem: 'A CNH deve conter exatamente 11 dígitos numéricos.'
    });
  }

  next();
}

module.exports = validaCnh;
