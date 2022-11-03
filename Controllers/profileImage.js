const sequelize = require('../models')
const Sequelize = require('sequelize')
const imageModel = require('../models/image.model')
const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (req, res, next) => {
  const image = imageModel(sequelize, Sequelize);

  try {
    const flag = req.body.online;

    if (flag == "true") {

      cloudinary.v2.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
      })

      let data = await cloudinary.v2.uploader.upload(req.file.path);
      return res.json(data.secure_url);
    } else {
      sequelize
        .sync()
        .then(() => {
          console.log("table created");
          image
            .create({
              photo: req.file.filename,
            })
            .then((res) => {
              return res;
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });

      return res.json("image uploaded");
    }
  } catch (err) {
    return res.json(err);
  }
}
