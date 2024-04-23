const { encrypt } = require("../helpers/handlePassword");
const db = require("../models");
const Op = db.Sequelize.Op;
const Client = db.client;
const CompanyUser = db.companyUser;
const LoginRegister = db.loginRegister
const fs = require("fs");
const { tokenSign, verifyToken } = require("../helpers/handleJwt");
const { compare } = require("bcryptjs");
const moment = require('moment-timezone');

// register a new client user
exports.register = async (req, res) => {
  try {
    const password = await encrypt(req.body.password);
    const client = {
      name: req.body.name,
      phone: req.body.phone || "",
      email: req.body.email,
      address: req.body.address,
      username: req.body.username,
      password: password,
      isImportant: req.body.isImportant || false,
      logoFile: req?.file?.path || "",
    };
    // Save Client in the database
    const clientUser = await Client.create(client);
    const access_token = {
      token: await tokenSign(clientUser.toJSON()),
    };
    clientUser.password = "";
    clientUser.role = ['client']
    clientUser.data ={}
    clientUser.data.username = clientUser.username;
    clientUser.data.email = clientUser.email;
    clientUser.data.id = clientUser.id;
    res.send({ access_token, user: clientUser });
  } catch (error) {
    if (req?.file?.path) {
      fs.unlinkSync(req.file.path);
    }
    res.status(200).send({
      error: [
        {
          value: "",
          msg: {
            message:
              "Some error occurred while register, try refreshing your page.",
          },
        },
      ],
    });
  }
};

// log in
exports.logIn = async (req, res) => {
  try {
    const login = req.body.login || "";
    const password = req.body.password;
    const clientUser = await Client.findOne({
      where: {
        [Op.or]: [
          {
            username: login,
          },
          {
            email: login,
          },
        ],
      },
    });
    if (!clientUser) {
      const companyUserQuery = await CompanyUser.findOne({
        where: {
          [Op.or]: [
            {
              username: login,
            },
            {
              email: login,
            },
          ],
        },
      });
      if (!companyUserQuery) {
        res.status(200);
        res.send({
          error: [
            {
              value: "",
              msg: {
                message: `incorrect email or password`,
              },
            },
          ],
        });
        return;
      } else {
        const companyUserdata = companyUserQuery.toJSON();
        const hashPassword = companyUserdata.password;
        const check = await compare(password, hashPassword);
        if (!check) {
          res.status(200);
          res.send({
            error: [
              {
                value: "",
                msg: {
                  message: `incorrect email or password`,
                },
              },
            ],
          });
          return;
        }
        const access_token = {
          token: await tokenSign(companyUserdata),
        };
        companyUserdata.password = "";
        companyUserdata.data ={}
        companyUserdata.data.username = companyUserdata.username;
        companyUserdata.data.email = companyUserdata.email;
        companyUserdata.data.id = companyUserdata.id;
        companyUserdata.role = companyUserdata.isAdmin ? ['admin'] : ['employee']
        const now = moment().utc();
        const time = now.tz('Asia/Dubai').format().toString()
        LoginRegister.create({user:companyUserdata.username, time:time})
        res.send({ access_token, user: companyUserdata });
      }
    } else {
      const userdata = clientUser.toJSON();
      const hashPassword = userdata.password;
      const check = await compare(password, hashPassword);
      if (!check) {
        res.status(200);
        res.send({
          error: [
            {
              value: "",
              msg: {
                message: `incorrect email or password`,
              },
            },
          ],
        });
        return;
      }
      const access_token = {
        token: await tokenSign(userdata),
      };
      userdata.password = "";
      userdata.data ={}
      userdata.data.username = userdata.username;
      userdata.data.email = userdata.email;
      userdata.data.id = userdata.id;
      userdata.role =  ['client']
      const now = moment().utc();
      const time = now.tz('Asia/Dubai').format().toString()
      LoginRegister.create({user:userdata.username, time:time})
      res.send({ access_token, user: userdata });
    }
  } catch (error) {
    console.log(error);
    res.status(200).send({
      error: [
        {
          value: "",
          msg: {
            message: "incorrect email or password",
          },
        },
      ],
    });
  }
};

// access
exports.access = async (req, res) => {
  try {
    const access_token = req.body.access_token;
    if (!access_token) {
      res.status(200).send({
        error: [
          {
            value: "",
            msg: {
              message: "token requiered.",
            },
          },
        ],
      });
      return;
    }
    const dataToken = await verifyToken(access_token);
    if (!dataToken?.id) {
      res.status(200).send({
        error: [
          {
            value: "",
            msg: {
              message: "invalid token.",
            },
          },
        ],
      });
      return;
    }
    const clientUser = await Client.findOne({
      where: {
        id: dataToken.id,
        email: dataToken.email,
        username: dataToken.username,
      },
    });
    if(!clientUser){
      const companyUser = await CompanyUser.findOne({
        where: {
          id: dataToken.id,
          email: dataToken.email,
          username: dataToken.username,
        },
      });
      if(!companyUser){
        res.status(200).send({
          error: [
            {
              value: "",
              msg: {
                message: "invalid token.",
              },
            },
          ],
        });
      }else{
        const userCompanydata = companyUser.toJSON();
        const new_access_token = {
          token: await tokenSign(userCompanydata),
        };
        userCompanydata.password = "";
        userCompanydata.data ={}
        userCompanydata.data.username = userCompanydata.username;
        userCompanydata.data.email = userCompanydata.email;
        userCompanydata.data.id = userCompanydata.id;
        userCompanydata.role = userCompanydata.isAdmin ? ['admin'] : ['employee']
        res.send({ access_token: new_access_token, user: userCompanydata });
      }
    }else{
      const userdata = clientUser.toJSON();
    const new_access_token = {
      token: await tokenSign(userdata),
    };
    userdata.password = "";
    userdata.data ={}
    userdata.data.username = userdata.username;
    userdata.data.email = userdata.email;
    userdata.data.id = userdata.id;
    userdata.role = ["client"];
    res.send({ access_token: new_access_token, user: userdata });
    }
    
  } catch (error) {
    res.status(200).send({
      error: [
        {
          value: "",
          msg: {
            message:
              "Some error occurred while log in, try refreshing your page.",
          },
        },
      ],
    });
  }
};
