const db = require('../database/connection');

const veiculosController = {
	listarTodos: async (req, res) => {
		try {
			const veiculos = await db('veiculos').select('*');
			res.status(200).json(veiculos);
		} catch (erro) {
			res.status(500).json({ erro: "Erro ao consultar banco de dados." });
		}
	},

	criar: async (req, res) => { 
		try {
			const { placa, montadora, modelo } = req.body;

			if (!placa || !montadora || !modelo) {
				return res.status(400).json({ erro: "Campos 'placa', 'montadora' e 'modelo' são obrigatórios."});
			}

			const [id] = await db('veiculos').insert({
				placa,
				montadora,
				modelo
			});

			const novoVeiculo = await
				db('veiculos').where('id', id).first();
			res.status(201).json(novoVeiculo);
		} catch (erro) {
			if (erro.message.includes('UNIQUE constraint failed')) {
				return res.status(409).json({ erro: "Já existe um veículo cadastrado com essa placa." });
			}
			res.status(500).json({ erro: "Erro ao inserir veiculo no banco de dados."});
		}
	},
	async buscarPorId(req, res) {
  		try {
    			const { id } = req.params;

    		const veiculo = await db('veiculos').where({ id }).first();

    		if (!veiculo) {
      			return res.status(404).json({ mensagem: 'Veículo não encontrado' });
    	}

    	return res.status(200).json(veiculo);
  		} catch (error) {
    			return res.status(500).json({ mensagem: 'Erro interno do servidor', erro: error.message });
  		}
	},
	atualizarStatus: async (req, res) => {
                try {
                        const { id } = req.params;
                        const { status } = req.body;

                        const veiculoExiste = await db('veiculos').where({ id }).first();
                        if (!veiculoExiste) {
                                return res.status(404).json({ mensagem: 'Veículo não encontrado' });
                        }

                        await db('veiculos').where({ id }).update({ status });
                        return res.status(200).json({ mensagem: 'Status atualizado com sucesso' });
                } catch (error) {
                        return res.status(500).json({ mensagem: 'Erro ao atualizar status', erro: error.message });
                }
        }
};

module.exports = veiculosController;


