const db = require('../database/connection');

const frotaController = {
    listarTudo: async (req, res, next) => {
        try {
            const dados = await db('veiculos as v')
                .leftJoin('telemetria as t', 'v.id', '=', 't.veiculo_id')
                .select(
                    'v.id as veiculo_id',
                    'v.placa',
                    'v.modelo',
                    't.velocidade',
                    't.temperatura_motor'
                );

            res.status(200).json(dados);
        } catch (erro) {
            next(erro);
        }
    },

    cadastrarVeiculo: async (req, res, next) => {
        try {
            const { placa, montadora, modelo } = req.body;

            if (!placa || !montadora || !modelo) {
                return res.status(400).json({ erro: "Campos 'placa', 'montadora' e 'modelo' são obrigatórios." });
            }

            const [id] = await db('veiculos').insert({ placa, montadora, modelo });
            res.status(201).json({ id, placa, montadora, modelo });
        } catch (erro) {
            next(erro);
        }
    }
};

module.exports = frotaController;
