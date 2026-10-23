exports.seed = async function(knex) {
	await knex('telemetria').del();
	await knex('veiculos').del();

	const [v1] = await knex('veiculos').insert({ placa: 'VOL-1010', montadora: 'Volvo', modelo: 'FH 540' });
	const [v2] = await knex('veiculos').insert({ placa: 'SCA-2020', montadora: 'Scania', modelo: 'R500' });

	await knex('telemetria').insert([
		{ veiculo_id: v1, velocidade: 80.0, temperatura_motor: 88.5 },
		{ veiculo_id: v1, velocidade: 85.2, temperatura_motor: 90.1 },
		{ veiculo_id: v2, velocidade: 92.0, temperatura_motor: 94.8 },
	]);
};
