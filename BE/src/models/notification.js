"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Notification.hasMany(models.User_Notification, {
        foreignKey: "notificationId",
        as: "NotificationData",
      });
    }
  }
  Notification.init(
    {
      type: DataTypes.STRING,
      message: DataTypes.TEXT,
      path: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Notification",
    }
  );
  return Notification;
};
