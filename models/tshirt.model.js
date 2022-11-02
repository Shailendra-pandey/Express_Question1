module.exports = (sequelize, type) => {
  return sequelize.define("tshirt", {
    title: { type: type.STRING, allowNull: true},
    price: { type: type.STRING, allowNull: true },
  });
};
