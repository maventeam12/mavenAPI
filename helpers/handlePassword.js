const bcryptjs = require("bcryptjs");
const encrypt = async (passwordPlain) => {
  const hash = await bcryptjs.hash(passwordPlain, 10);
  return hash;
};

const compare = async (passwordPlain, hash) => {
  return await bcryptjs.compare(passwordPlain, hash);
};
module.exports = { encrypt, compare };
