const db = require("../models");
const CompanyUser = db.companyUser;
const Client = db.client;
const checkRole = (role) => async (req, res, next) => {
  try {
    const username = req.headers.username;
    const id = req.headers.id;
    const email = req.headers.email;

    const checkValueRoleGuest = role.some((rolSingle) =>
      ["guest"].includes(rolSingle)
    );
    if (checkValueRoleGuest) {
      next();
    } else {
      const clientQuery = await Client.findOne({
        where: {
          username,
          email,
          id,
        },
      });
      const userCompanyQuery = await CompanyUser.findOne({
        where: {
          username,
          email,
          id,
        },
      });
      if (clientQuery) {
        const clientdata = clientQuery.toJSON();
        const checkValueRole = role.some((rolSingle) =>
          ["client"].includes(rolSingle)
        );
        if (!checkValueRole) {
          res.send({
            error: [
              {
                value: "",
                msg: {
                  message: `user dont have permission!`,
                },
              },
            ],
          });
          return;
        } else {
          next();
        }
      }
      if (userCompanyQuery) {
        const companyUserdata = userCompanyQuery.toJSON();
        if (companyUserdata.isAdmin == true) {
          const checkValueRole = role.some((rolSingle) =>
            ["admin"].includes(rolSingle)
          );
          if (!checkValueRole) {
            res.send({
              error: [
                {
                  value: "",
                  msg: {
                    message: `user dont have permission!`,
                  },
                },
              ],
            });
            return;
          } else {
            next();
          }
        } else {
          const checkValueRole = role.some((rolSingle) =>
            ["employee"].includes(rolSingle)
          );
          if (!checkValueRole) {
            res.send({
              error: [
                {
                  value: "",
                  msg: {
                    message: `user dont have permission!`,
                  },
                },
              ],
            });
            return;
          } else {
            next();
          }
        }
      }
    }
  } catch (error) {
    res.send({
      error: [
        {
          value: "",
          msg: {
            message: `user dont have permission!`,
          },
        },
      ],
    });
  }
};
module.exports = checkRole;
