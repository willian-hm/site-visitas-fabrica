const pool = require("../db");

async function salvarVisita({ nome, email, motivo, empresa, foto }) {
    return pool.query(
        "INSERT INTO visita (nome, email, motivo, empresa, dataentrada, foto) VALUES ($1, $2, $3, $4, NOW(), $5)",
        [nome, email, motivo, empresa, foto]
    );
}

async function obterVisitas() {
    const result = await pool.query("SELECT * FROM visita ORDER BY dataentrada DESC");
    return result.rows;
}

module.exports = { salvarVisita, obterVisitas };
