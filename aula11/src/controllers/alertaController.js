const Alerta = require('../models/Alerta');

const alertaController = {
  // Salvar novo documento BSON
  criarAlerta: async (req, res) => {
    try {
      const { equipamentoId, nivelSeveridade, temperaturaMedida, metadados, tags } = req.body;

      const novoAlerta = await Alerta.create({
        equipamentoId,
        nivelSeveridade,
        temperaturaMedida,
        metadados,
        tags
      });

      res.status(201).json(novoAlerta);
    } catch (erro) {
      res.status(400).json({ erro: "Erro ao salvar alerta no MongoDB", detalhe: erro.message });
    }
  },

  // Listar todos os alertas registrados
  listarAlertas: async (req, res) => {
    try {
      const alertas = await Alerta.find().sort({ registradoEm: -1 });
      res.status(200).json(alertas);
    } catch (erro) {
      res.status(500).json({ erro: "Erro ao consultar coleção no MongoDB" });
    }
  },

  // Buscar alertas filtrando por nível de severidade
  buscarPorSeveridade: async (req, res) => {
    try {
      const { nivel } = req.params;
      const alertas = await Alerta.find({ nivelSeveridade: nivel }).sort({ registradoEm: -1 });
      res.status(200).json(alertas);
    } catch (erro) {
      res.status(500).json({ erro: "Erro ao consultar alertas por severidade" });
    }
  }
};

module.exports = alertaController;
