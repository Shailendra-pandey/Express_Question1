module.exports = async (req, res, next) => {
  const image = imageModel(sequelize, Sequelize);

  try {
    const flag = req.body.online;

    if (flag == "true") {
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
              console.log(res);
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
