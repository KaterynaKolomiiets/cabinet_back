const connection = require("../../db");

const getFatturas = async (req, res, next) => {
  try {
    const query = `SELECT * from fattura WHERE id_cliente=${req.userId}`;
    const [fatturas] = await connection.query(query);
    if (!fatturas.length) {
      return res.status(404).json("No fatturas found");
    }
    return res.status(200).json(fatturas);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const getFatturaDetails = async (req, res, next) => {
  try {
    const query = `SELECT * FROM fattura_dettaglio WHERE id_fattura=${req.params.fatturaId}`;
    const [[fatturaInfo]] = await connection.query(query);
    return res.status(200).json(fatturaInfo);
  } catch (e) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports = { getFatturas, getFatturaDetails };
