module.exports = (sequelize) => {
  const users = sequelize.define('users', {
  });

  users.associate = (db) => {
    users.hasOne(db.facebooks);
    users.belongsToMany(users, { as: 'myFriends', through: 'friendships', foreignKey: 'userId' });
    users.belongsToMany(users, { as: 'otherFriends', through: 'friendships', foreignKey: 'friendId' });
    users.hasMany(db.trips, { as: 'trips', foreignKey: 'createdByUserId' });
  };

  users.newUser = user => users.create(user, {
    include: [{ model: sequelize.models.facebooks }],
  });

  users.getByIdAsync = id => users.find({
    where: { id },
    attributes: ['id', 'createdAt', 'updatedAt'],
    include: [
      {
        model: sequelize.models.facebooks,
        attributes: ['firstName', 'lastName', 'pictureUrl', 'fbId'],
      },
    ],
  });

  return users;
};
