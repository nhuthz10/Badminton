import express from "express";
import notificationService from "../controllers/notificationController";
import { authAdmin, commonAuthUser } from "../middlewares/auth";
let router = express.Router();

router.get(
  "/get-all-notification-admin",
  authAdmin,
  notificationService.handleGellAllNotificationAdmin
);

router.put(
  "/update-notification",
  commonAuthUser,
  notificationService.handleUpdateNotification
);

export default router;
