const { verifyToken } = require("../helpers/handleJwt");
const db = require("../models");

const session = async (req, res, next) => {
  try {
    const access_token = req.headers.access_token
    if (!access_token) {
      res.send({
        error:[
          {
            value:'',
            msg:{
              message:"invalid token!"
            }
          }
        ]
      });
      return;
    }
    const dataToken = await verifyToken(access_token);
    if (!dataToken?.id) {
      res.send({
        error:[
          {
            value : "",
            msg : {
              message: `invalid token!`
            }
          }
        ]
      });
      return;
    }
    next();
  } catch (error) {
    res.send({
      error:[
        {
          value : "",
          msg : {
            message: `invalid token!`
          }
        }
      ]
    });
    return;
  }
};
module.exports = session;