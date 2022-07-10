module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    full_name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    is_active: {
      type: Sequelize.BOOLEAN
    }
  });
  return User
};
