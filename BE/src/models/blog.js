"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Blog.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "id",
        as: "UserBlogData",
      });
    }
  }
  Blog.init(
    {
      title: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      image: DataTypes.STRING,
      imageId: DataTypes.STRING,
      content: DataTypes.TEXT("long"),
      contentHTML: DataTypes.TEXT("long"),
      isPublished: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Blog",
    }
  );
  return Blog;
};
