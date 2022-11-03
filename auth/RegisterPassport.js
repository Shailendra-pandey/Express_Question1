const Usermodel = require("../models/userdetails.model");
const sequelize = require("../models");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const passport = require("passport");
const { Sequelize } = require("sequelize");

const User = Usermodel(sequelize, Sequelize);

const initialize = (passport, getUserByEmail, save) => {
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          const firstName = req.body.firstName;
          const lastName = req.body.lastName;
          const userName = req.body.userName;

          const encryptPassword = await bcrypt.hash(password, 10);
          sequelize
            .sync()
            .then(() => {
              console.log("table created");
              User.create({
                firstName,
                lastName,
                userName,
                email,
                password: encryptPassword,
              }).then((newUser) => {
                return done(null, newUser);
              }).catch((error) => {
                return done("user exist", false);
              });
            })
            .catch((error) => {
              console.error(error);
            });
        } catch (err) {
          done(err);
        }
      }
    )
  );
};

export default initialize;
