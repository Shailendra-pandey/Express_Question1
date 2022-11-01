import Joi, { link, string } from "joi";
import CustomErrorHandler from "../services/CustomErrorHandler";
// import {
//   user,
//   access_token,
//   addressSc,
//   images,
//   tshirt,
//   mobile,
// } from "../models";
import bcrypt from "bcrypt";
import JwtService from "../services/JwtService";
import passport from "passport";
import dotenv from "dotenv";
import { cloud } from "../config/cloudinary";
const cloudinary = require("cloudinary");
dotenv.config();
import upload from "../config/multer";
const nodemailer = require("nodemailer");
import mail from "../services/email";
import { json } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");
const json2csv = require("json2csv").Parser;
const puppeteer = require("puppeteer");
const Sequelize = require("sequelize");
const sequelize = require("../models");
const Usermodel = require("../models/userdetails.model");
const addressModel = require("../models/useraddress.model");

const registerController = {
  async register(req, res, next) {
    const registerSchema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      userName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      confirmPassword: Joi.ref("password"),
    });

    // check validation
    const { error } = registerSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    passport.authenticate(
      "local-signup",
      { session: false },
      (err, newUser) => {
        if (err) {
          return res.json(err);
        }

        if (newUser) {
          let message = {
            from: "sydnie56@ethereal.email",

            to: newUser.email,

            subject: "Registration",

            text: "You are registered successfully",
          };

          mail(message);

          return res.json("user register successfully");
        }
      }
    )(req, res, next);

    //check if user is in the database already

    // try {
    //     const exist = await user.exists({
    //         userName: req.body.userName,
    //         email: req.body.email
    //     });

    //     if (exist) {
    //         return next(CustomErrorHandler.alreadyExist("user name or email exists in database"));
    //     }

    // } catch (err) {
    //     return next(err);
    // }

    // const { firstName, lastName, userName, email, password } = req.body;

    // // password encryption

    // const encryptPassword = await bcrypt.hash(password, 10);

    // // data

    // const userdata = new user({
    //     firstName: firstName,
    //     lastName: lastName,
    //     userName: userName,
    //     email: email,
    //     password: encryptPassword
    // })

    // try {
    //     await userdata.save();
    // } catch (err) {
    //     return next(err);
    // }

    // res.json("User registerd successfully");
  },
};

const loginController = {
  async login(req, res, next) {
    const loginValidate = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error } = loginValidate.validate(req.body);

    if (error) {
      return next(error);
    }

    passport.authenticate("local", { session: false }, (err, users) => {
      if (err) {
        return res.json(err);
      }

      const token = JwtService.sign({ id: users.id });
      res.json({ token });
    })(req, res, next);

    // try {
    //     const users = await user.findOne({ email: req.body.email });

    //     if (!users) {
    //         return next(CustomErrorHandler.wrongCredentials());
    //     }

    //     if (error) {
    //         return next(error);
    //     }

    //     const match = await bcrypt.compare(req.body.password, users.password);

    //     if (match) {

    //         const token = await JwtService.sign({ _id: users._id });
    //         res.json({ token });

    //     } else {
    //         res.json('incorrect password');
    //     }

    // } catch (error) {
    //     return next(error);
    // }
  },
};

const addressController = {
  async add_detail(req, res, next) {
    const addressSchema = Joi.object({
      address: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      pin_code: Joi.number().required(),
      phone_no: Joi.number().required(),
    });

    const { address, city, state, pin_code, phone_no } = req.body;

    const { error } = addressSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    console.log(req.user);

    // const User = Usermodel(sequelize, Sequelize);
    const add = addressModel(sequelize, Sequelize);

    const { id } = req.user;

    console.log(id);
    // try {
    // const users = await User.findOne({ where: { id: id } });

    // console.log(users.dataValues.id);

    sequelize
      .sync()
      .then(() => {
        console.log("table created");
        add.create({
          user_id: id,
          address,
          city,
          state,
          pin_code,
          phone_no,
        })
          .then((res) => {
            console,log(res)
          })
          .catch((error) => {
            console.log(error)
          });
      })
      .catch((error) => {
        console.error(error);
      });

    // await add.create({
    //   user_id: users.dataValues.id,
    //   address: address,
    //   city: city,
    //   state: state,
    //   pin_code: pin_code,
    //   phone_no: phone_no,
    // });

    // try {
    //   await add.save();
    // } catch (err) {
    //   return next(err);
    // }
    // } catch (err) {
    //   return next(err);
    // }

    res.json("Address added");
  },
};

const userController = {
  async userdetail(req, res, next) {
    try {
      const users = await user.findOne({ _id: req.user });

      const address = await addressSc.findOne({ user_id: req.user });

      res.json({ users, address });
    } catch (err) {
      return next(err);
    }
  },
};

const deleteController = {
  async delete(req, res, next) {
    try {
      await user.deleteOne({ _id: req.user });
      return res.json("user deleted");
    } catch (err) {
      return next(err);
    }
  },
};

const userlist = {
  async list(req, res, next) {
    const { page, limit } = req.query;

    try {
      const users = await user
        .find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

      const count = await user.countDocuments();

      res.json({
        users,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      });
    } catch (err) {
      return next(err);
    }
  },
};

const addressDelete = {
  async delete(req, res, next) {
    try {
      await addressSc.deleteMany({ user_id: req.user });
      return res.json("address deleted");
    } catch (err) {
      return next(err);
    }
  },
};

const forgotPassword = {
  async resetPassword(req, res, next) {
    try {
      const users = await user.findOne({ email: req.body.email });

      if (!users) {
        return res.json("user not found");
      }

      const token = JwtService.sign({ _id: users._id }, "15m");

      let message = {
        from: "sydnie <sydnie56@ethereal.email>",

        to: users.email,

        subject: "Password reset token",

        text: `http://localhost:5000/verify-reset-password?Bearer ${token}`,
      };

      mail(message);

      return res.json("token send to email");
    } catch (err) {
      return next(err);
    }
  },
};

const verifyResetPassword = {
  async verifyPassword(req, res, next) {
    const passValid = Joi.object({
      password: Joi.string().required(),
      confirmPassword: Joi.ref("password"),
    });

    const { error } = passValid.validate(req.body);

    if (error) {
      return next(error);
    }

    try {
      const users = await user.findOne({ _id: req.user });

      if (!users) {
        return res.json("user not found");
      }

      const encryptPassword = await bcrypt.hash(req.body.password, 10);

      await users.updateOne({ password: encryptPassword });

      let message = {
        from: "sydnie56@ethereal.email",

        to: users.email,

        subject: "Registration",

        text: "You are registered successfully",
      };

      mail(message);

      return res.json("email send");
    } catch (err) {
      return res.json(err);
    }
  },
};

const profileImage = {
  async Images(req, res, next) {
    try {
      const flag = req.body.online;

      if (flag == "true") {
        let data = await cloudinary.v2.uploader.upload(req.file.path);
        return res.json(data.secure_url);
      } else {
        const newImage = new images({
          image: {
            data: req.file.filename,
            contentType: "image/png",
          },
        });

        newImage.save();

        return res.json("image uploaded");
      }
    } catch (err) {
      return res.json(err);
    }
  },
};

const flipkart = {
  async mobile(req, res, next) {
    const url =
      "https://www.flipkart.com/search?q=mobiles&as=on&as-show=on&otracker=AS_Query_TrendingAutoSuggest_1_0_na_na_na&otracker1=AS_Query_TrendingAutoSuggest_1_0_na_na_na&as-pos=1&as-type=HISTORY&suggestionId=mobiles&requestId=461cb39b-f157-4cde-9add-3a0c836b952e";

    try {
      // let mobile_urls = [];

      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url, { timeout: 0 });

      let mobile_urls = await page.evaluate(() => {
        let results = [];
        let items = document.querySelectorAll("._1fQZEK");
        items.forEach((item) => {
          results.push("https://www.flipkart.com" + item.getAttribute("href"));
        });
        return results;
      });

      for (var i = 0; i < mobile_urls.length; i++) {
        const newpage = await browser.newPage();
        await newpage.goto(mobile_urls[i], { timeout: 0 });
        const mobile_details = await newpage.evaluate(() => {
          let results = [];
          let items = document.body;
          let data = {};
          items.querySelectorAll("._3k-BhJ") &&
            items.querySelectorAll("._3k-BhJ").forEach((i) => {
              if (!i.querySelectorAll("._1hKmbr")) return;
              const x = i.querySelectorAll("._1hKmbr").length;
              for (let j = 0; j < x; j++) {
                data[i.querySelectorAll("._1hKmbr")[j].innerText] =
                  i.querySelectorAll("._21lJbe")[j].innerText;
              }
            });
          results.push({
            mobileName: items.querySelector(".aMaAEs .B_NuCI").innerText,
            price: items.querySelector(".aMaAEs ._16Jk6d").innerText,
            specification: data,
          });
          return results;
        });
        mobile_details.forEach((m) => {
          const mobile_data = new mobile({
            mobileName: m.mobileName,
            price: m.price,
            specification: m.specification,
          });
          mobile_data.save();
        });
      }

      browser.close();
      return res.send("saved");
    } catch (error) {
      return next("can't save this time");
      console.error(error);
    }
  },
};

const snapdeal = {
  async tshirt(req, res, next) {
    try {
      (async () => {
        const browser = await puppeteer.launch({
          executablePath: "/usr/bin/google-chrome-stable",
        });
        const page = await browser.newPage();
        await page.goto(
          "https://www.snapdeal.com/products/men-apparel-tshirts?sort=plrty"
        );

        const tshirtDetail = await page.evaluate(() => {
          let results = [];
          let items = document.querySelectorAll(".product-desc-rating ");
          items.forEach((item) => {
            results.push({
              title: item.querySelector(".product-title ").innerText,
              price: item.querySelector(".product-price").innerText,
            });
          });

          return results;
        });

        tshirtDetail.forEach((newtshirt) => {
          const t_shirt = new tshirt({
            title: newtshirt.title,
            price: newtshirt.price,
          });
          try {
            t_shirt.save();
          } catch (err) {
            return next(err);
          }
        });

        browser.close();
        return res.json("data added");
      })();
    } catch (error) {
      console.error(error);
    }
  },
};

export default {
  registerController,
  loginController,
  userController,
  deleteController,
  userlist,
  addressController,
  addressDelete,
  forgotPassword,
  verifyResetPassword,
  profileImage,
  flipkart,
  snapdeal,
};
