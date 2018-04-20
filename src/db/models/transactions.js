module.exports = (sequelize, DataTypes) => {
  const transactions = sequelize.define('transactions', {
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    tripId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'trips',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  }, {});

  transactions.associate = (models) => {
    transactions.belongsTo(models.users, { as: 'addedBy', foreignKey: 'userId' });
    transactions.belongsTo(models.trips, { as: 'trip', foreignKey: 'tripId' });
  };

  return transactions;
};
