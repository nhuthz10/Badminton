import db from "../models/index";
require("dotenv").config();

let createNewNotificationService = (data, transaction) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.type || !data.message) {
        resolve({
          errCode: 1,
          message: "Missing required parameter!!!",
        });
      } else {
        if (data.type === "admin") {
          const notification = await db.Notification.create(
            {
              type: "admin",
              message: data.message,
              path: data.path,
            },
            { transaction }
          );

          let admin = await db.User.findAll({
            where: { roleId: "R1" },
            attributes: ["id"],
            raw: true,
          });

          admin = admin.map((item) => {
            return { userId: item.id, notificationId: notification.id };
          });

          await db.User_Notification.bulkCreate(admin, { transaction });

          resolve({
            errCode: 0,
            message: "Create notification succeed",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllNotificationAdminService = (userId, status) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId || !status) {
        resolve({
          errCode: 1,
          message: "Missing required parameter!!!",
        });
      } else {
        if (status === "ALL") {
          let notifications = await db.User_Notification.findAll({
            order: [["id", "DESC"]],
            where: { userId: userId },
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            include: [
              {
                model: db.Notification,
                as: "NotificationData",
                where: { type: "admin" },
                attributes: ["message", "createdAt", "path"],
              },
            ],
            raw: true,
            nest: true,
          });
          resolve({
            errCode: 0,
            data: notifications,
            message: "Get all notification succeed",
          });
        } else {
          let notifications = await db.User_Notification.findAll({
            order: [["id", "DESC"]],
            where: { userId: userId, status: 0 },
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            include: [
              {
                model: db.Notification,
                as: "NotificationData",
                where: { type: "admin" },
                attributes: ["message", "createdAt", "path"],
              },
            ],
            raw: true,
            nest: true,
          });
          resolve({
            errCode: 0,
            data: notifications,
            message: "Get all notification succeed",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let updateNotificationService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          message: "Missing required parameter!!!",
        });
      } else {
        let notification = await db.User_Notification.findOne({
          where: { id: id },
          raw: false,
        });
        if (notification) {
          notification.status = 1;

          await notification.save();
          resolve({
            errCode: 0,
            message: "Update notification succeed",
          });
        } else {
          resolve({
            errCode: 2,
            message: "Notification isn't exist",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllNotificationAdminService,
  createNewNotificationService,
  updateNotificationService,
};
