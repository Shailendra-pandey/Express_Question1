module.exports = (sequelize, type) => {
    return sequelize.define("mobile", {
        mobileName: { type: type.STRING, allowNull: true },
        price: { type: type.STRING, allowNull: true },
        specification: { type: type.JSON },
    });
  };
  