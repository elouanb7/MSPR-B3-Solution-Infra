module.exports = (sequelize, Sequelize) => {
  const LogConnection = sequelize.define("log_connection", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    useragent: {
      type: Sequelize.STRING,
    },
    ip: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    isVerified: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  return LogConnection;
};
