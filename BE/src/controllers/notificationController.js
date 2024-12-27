import notificationService from "../services/notificationService";

let handleGellAllNotificationAdmin = async (req, res) => {
  try {
    let message = await notificationService.getAllNotificationAdminService(
      req.query.userId,
      req.query.status
    );
    if (message.errCode === 0) return res.status(200).json(message);
    else return res.status(400).json(message);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      message: "Error form the server!!!",
    });
  }
};

let handleUpdateNotification = async (req, res) => {
  try {
    let id = req.body.notificationId;
    let message = await notificationService.updateNotificationService(id);
    if (message.errCode === 0) return res.status(200).json(message);
    else return res.status(400).json(message);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: -1,
      message: "Error form the server!!!",
    });
  }
};

module.exports = {
  handleGellAllNotificationAdmin,
  handleUpdateNotification,
};
