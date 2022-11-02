module.exports = (sequelize, type) => {
    return sequelize.define("image", {
      photo:{type: type.BLOB("long")}
    });
  };
  