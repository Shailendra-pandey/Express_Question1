module.exports = (sequelize, type) => {
  return sequelize.define("User", {
    firstName: { type: type.STRING },
    lastName: { type: type.STRING, allowNull: false },
    userName: { type: type.STRING, allowNull: false, unique: true },
    email: { type: type.STRING, allowNull: false, unique: true },
    password: { type: type.STRING, allowNull: false },
  });
};
