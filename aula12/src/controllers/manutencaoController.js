const Manutencao = require('../models/Manutencao');

const manutencaoController = {
	// Criar Registro com Subdocumentos
	criar: async (req, res) => {
		try {
			const novaManutencao = await Manutencao.create(req.body);
			res.status(201).json(novaManutencao);
		} catch (erro) {
			res.status(400).json({ erro: "Erro ao registrar manuteção", detalhe: erro.message });
		}
	},

	// Listar com Filtro Avançado ($gte / $lte em Custo)
	listarComFiltros: async (req, res) => {
		try {
			const { minCusto, status } = req.query;
			let query = {};

			if (minCusto) {
				query.custoTotal = { $gte: Number(minCusto) };
		}

		if (status) {
			query.status = status;
		}

		const resultados = await Manutencao.find(query).sort({ createdAt: -1 });
		res.status(200).json(resultados);
	} catch (erro) {
		res.status(500).json({ erro: "Erro ao consultar manutenções." });
	}
},

	// Atualizar Status por ID
	atualizarStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const atualizado = await Manutencao.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
      );

      if (!atualizado) {
        return res.status(404).json({ erro: "Registro de manutenção não encontrado." });
      }

      res.status(200).json(atualizado);
    } catch (erro) {
      res.status(400).json({ erro: "Erro ao atualizar registro.", detalhe: erro.message });
    }
  },

	// Deletar Registro por ID
	excluir: async (req, res) => {
		try {
			const { id } = req.params;
			const removido = await Manutencao.findByIdAndDelete(id);
			if (!removido) {
				return res.status(404).json({ erro: "Erro ao excluir registro." });
			}
			res.status(200).json({ mensagem: "Registro excluído com sucesso." });
		} catch (erro) {
			res.status(400).json({ erro: "Erro ao excluir registro.", detalhe: erro.message });
		}
	},
		// Buscar por Placa (Regex case-insensitive)
	buscarPorPlaca: async (req, res) => {
		try {
			const { placa } = req.params;
			const resultados = await Manutencao.find({
				veiculoPlaca: { $regex: placa, $options: 'i' }
			});
			res.status(200).json(resultados);
		} catch (erro) {
			res.status(500).json({ erro: "Erro ao buscar por placa." });
		}
	},
	adicionarPeca: async (req, res) => { try { const { id } = req.params; const atualizado = await Manutencao.findByIdAndUpdate(id, { $push: { pecasSubstituidas: req.body } }, { new: true, runValidators: true }); if (!atualizado) { return res.status(404).json({ erro: "Registro de manutenção não encontrado." }); } res.status(201).json(atualizado); } catch (erro) { res.status(400).json({ erro: "Erro ao adicionar peça.", detalhe: erro.message }); } },
};

module.exports = manutencaoController;
