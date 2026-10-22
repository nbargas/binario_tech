const express = require('express');
const router = express.Router();
const validaCnh = require('../middlewares/validaCnh');


const motoristas = [];


router.get('/', (req, res) => {
  res.status(200).json(motoristas);
});


router.post('/', validaCnh, (req, res) => {
  const { nome, cnh } = req.body;
  const novoMotorista = { id: motoristas.length + 1, nome, cnh };
  motoristas.push(novoMotorista);


  res.status(201).json({ mensagem: 'Motorista cadastrado com sucesso!', motorista: novoMotorista });
});


module.exports = router;
