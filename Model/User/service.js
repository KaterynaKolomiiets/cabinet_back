const nodemailer = require("nodemailer");
const connection = require("../../db");
const { nanoid } = require("nanoid");
require("dotenv").config();

const findUser = async (username) => {
  const searchQuery = `SELECT id, nome, cod_fisc, cognome, indirizzo, citta, prov, piva, tel, email, custarea_username, custarea_pass FROM cliente WHERE custarea_username= "${username}"`;
  const [[user]] = await connection.query(searchQuery);
  return user || null;
};

const setTemporaryPass = async (id, newPassword = nanoid()) => {
  const searchQuery = `UPDATE cliente SET custarea_pass="${newPassword}" WHERE id=${id}`;
  await connection.query(searchQuery);
  return newPassword;
};

const setNewPass = async (oldPass, newPass) => {
  const searchQuery = `UPDATE cliente SET custarea_pass="${newPass}" WHERE custarea_pass='${oldPass}'`;
  await connection.query(searchQuery);
  return newPass;
};

const sendMail = async (newPassword, userEmail) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.NODEMAILER_HOST,
      port: process.env.NODEMAILER_PORT,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.EMAIL_SENDER_PASSWORD,
      },
    });

    let resetLink = `${process.env.CLIENT_URL}/change-password/${newPassword}`;

    await transporter.sendMail({
      from: `"Marconi solutions" <${process.env.EMAIL_SENDER}>`,
      to: "kateryna.kolomiiets.official@gmail.com", // CHANGE
      subject: "Change password",
      html: `<P>Hello! Here is your new password <a href=${resetLink}>new password</a> </P>`,
    });
    return newPassword;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { findUser, setTemporaryPass, sendMail, setNewPass };
