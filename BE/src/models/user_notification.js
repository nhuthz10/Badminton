"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User_Notification.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
        as: "UserNotificationData",
      });
      User_Notification.belongsTo(models.Notification, {
        foreignKey: "notificationId",
        targetKey: "id",
        as: "NotificationData",
      });
    }
  }
  User_Notification.init(
    {
      userId: DataTypes.INTEGER,
      notificationId: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User_Notification",
    }
  );
  return User_Notification;
};
