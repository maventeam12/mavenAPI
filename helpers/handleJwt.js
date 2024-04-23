const jwt = require("jsonwebtoken");
const jwtSecret = process.env.jwtSecret;

const tokenSign = async (user) => {
  const sign = jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username
    },
    jwtSecret,
    {
      expiresIn: "6h",
    }
  );
  return sign;
};
const verifyToken = async (tokenJwt) => {
  try {
    return jwt.verify(tokenJwt, jwtSecret);
  } catch (error) {
    return null;
  }
};
module.exports = { tokenSign, verifyToken };
