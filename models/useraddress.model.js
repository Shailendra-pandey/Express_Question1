module.exports = (sequelize, type) => {
  return sequelize.define("User", {
    user_id: { type: type.String, allowNull: true },
    address: { type: type.String, allowNull: true },
    city: { type: type.String, allowNull: true },
    state: { type: type.String, allowNull: true },
    pin_code: { type: type.String, allowNull: true },
    phone_no: { type: type.String, allowNull: true }
  });
};
