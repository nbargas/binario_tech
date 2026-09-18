const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const usuarios = [];
const JWT_SECRET = process.env.JWT_SECRET || 'chave_secreta_binario_tech';

exports.register = async (req, res) => {
  // Código totalmente novo
};
