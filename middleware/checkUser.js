const db = require("../models");
const Client = db.client;
const CompanyUser = db.companyUser;


const checkUser = async (req, res, next) => {
  try {
    const username = req.headers.username;
    const id = req.headers.id;
    const email = req.headers.email;
    const clientQuery = await Client.findOne({where:{
        username,
        email,
        id
    }});
    const userQuery = await CompanyUser.findOne({where:{
        username,
        email,
        id
    }});
   
    if (clientQuery || userQuery) {
        next();
    } else {
        res.send({
            error:[
              {
                value : "",
                msg : {
                  message: `user error!`
                }
              }
            ]
          });
    }
  } catch (error) {
    res.status(200);
    res.send({
        error:[
          {
            value : "",
            msg : {
              message: `user error, try refreshing your page!`
            }
          }
        ]
      });
  }
};
module.exports = checkUser;
