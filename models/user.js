module.exports = (sequelize, Sequelize) => {
  const Table = sequelize.define("User", {
    username: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
  });
  return Table;
};
