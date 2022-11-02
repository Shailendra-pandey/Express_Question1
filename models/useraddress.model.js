module.exports = (sequelize, type) => {
  return sequelize.define("Address", {
    user_id: { type: type.INTEGER, allowNull: true },
    address: { type: type.STRING, allowNull: true },
    city: { type: type.STRING, allowNull: true },
    state: { type: type.STRING, allowNull: true },
    pin_code: { type: type.STRING, allowNull: true },
    phone_no: { type: type.STRING, allowNull: true }
  });
};
