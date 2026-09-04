const validaVin = (req, res, next) => {
	const { vin } = req.body;

	if (!vin) {
		return res.status(400).json({ erro: "Campo 'vin' é obrigatório." });
	}

	if (typeof vin !== "string" || vin.length !== 12) {
		return res.status(400).json({
			erro: "VIN inválido. O Chassis/VIN deve conter exatamente 12 caracteres.",
			vinRecebido: vin,
			tamanhoRecebido: String(vin).length
		});
	}

	next();
};

module.exports = validaVin;
