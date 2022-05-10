
const jwt = require("jsonwebtoken");
require("dotenv").config();

const {
  findUser,
  setTemporaryPass,
  sendMail,
  setNewPass,
} = require("./service");


const login = async (req, res, next) => {
  const { username, password } = req.body;
  const existingUser = await findUser(username);
  if (!existingUser) {
    return res.status(404).json("User not found");
  }
  // Password validity - works if password is not hashed
  if (password !== existingUser.custarea_pass) {
    return res.status(404).json("Wrong password");
  }
  const payload = {
    id: existingUser.id,
    email: existingUser.email,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({
    status: "Success",
    code: 200,
    data: {
      token,
      username: existingUser.custarea_username,
      id: existingUser.id,
      cod_fisc: existingUser.cod_fisc,
    },
  });
};

const logout = async (req, res, next) => {
  return res.status(204).json();
};

const refresh = async (req, res, next) => {
  return res.json({
    status: "Success",
    code: 200,
    data: true,
  });
};

const resetPassword = async (req, res, next) => {
  const { email } = req.body;
  const existingUser = await findUser(email);
  if (!existingUser) {
    return res.status(404).json("Your email is not in the database");
  }
  const newPassword = await setTemporaryPass(existingUser.id);
  await sendMail(newPassword, existingUser.email);
  return res.status(204).json()
};

const changePassword = async (req, res, next) => {
  const oldPass = req.url.split("/")[2];
  const newPass = Object.keys(req.body)[0];
  await setNewPass(oldPass, newPass);
  return res.status(204).json();
};

module.exports = { login, logout, refresh, resetPassword, changePassword };
