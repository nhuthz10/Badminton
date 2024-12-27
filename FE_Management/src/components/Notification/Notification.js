"use client";
import { Fragment, useEffect, useState } from "react";
import {
  handleGetAllNotificationService,
  handleUpdateNotificationService,
} from "@/services/userService";
import { useDispatch, useSelector } from "react-redux";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import Tippy from "@tippyjs/react/headless";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSocket } from "@/SocketContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import "./Notification.scss";
import { logOut } from "@/redux-toolkit/userSlice";

const Notification = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [readStatus, setReadStatus] = useState("ALL");
  const [notificationData, setNotificationData] = useState([]);
  const userId = useSelector((state) => state.user.userInfo?.id);
  const [countNotificationNoRead, setCountNotificationNoRead] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const socket = useSocket();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAllNotification();
  }, [readStatus]);

  useEffect(() => {
    let notificationNoRead = notificationData.filter(
      (item) => item.status === 0
    );

    setCountNotificationNoRead(notificationNoRead.length);
  }, [notificationData]);

  useEffect(() => {
    if (!socket) return;

    socket.on("notify-order-succeed", () => {
      fetchAllNotification();
    });

    socket.on("notify-cancel-order-succeed", () => {
      fetchAllNotification();
    });

    return () => {
      socket.off("notify-order-succeed");
      socket.off("notify-cancel-order-succeed");
    };
  }, [socket]);

  const fetchAllNotification = async () => {
    try {
      setIsLoading(true);
      let res = await handleGetAllNotificationService(userId, readStatus);
      if (res && res.errCode === 0) {
        setNotificationData(res?.data);
      }
    } catch (err) {
      if (err?.response?.data?.errCode === -4) {
        toast.error("Phiên bản đăng nhập hết hạn");
        dispatch(logOut());
      } else {
        toast.error(err?.response?.data?.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (dateString) => {
    const inputDate = new Date(dateString);

    const diffInMilliseconds = currentTime - inputDate;

    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    const diffInWeeks = Math.floor(
      diffInMilliseconds / (1000 * 60 * 60 * 24 * 7)
    );
    const diffInMonths = Math.floor(
      diffInMilliseconds / (1000 * 60 * 60 * 24 * 30)
    );
    const diffInYears = Math.floor(
      diffInMilliseconds / (1000 * 60 * 60 * 24 * 365)
    );

    if (diffInSeconds < 60) {
      return `${diffInSeconds} giây`;
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} phút`;
    } else if (diffInHours < 24) {
      return `${diffInHours} giờ`;
    } else if (diffInDays < 7) {
      return `${diffInDays} ngày`;
    } else if (diffInWeeks < 4) {
      return `${diffInWeeks} tuần`;
    } else if (diffInMonths < 12) {
      return `${diffInMonths} tháng`;
    } else {
      return `${diffInYears} năm`;
    }
  };

  const handClickFilterNotification = (status) => {
    setReadStatus(status);
  };

  const handleClickNotificationItem = async (id, status, path) => {
    if (status === 0) {
      try {
        let res = await handleUpdateNotificationService({
          notificationId: id,
          userId: userId,
        });
        if (res && res.errCode === 0) {
          fetchAllNotification();
        }
      } catch (err) {
        if (err?.response?.data?.errCode === 2) {
          toast.error("Thông báo không tồn tại");
        } else if (err?.response?.data?.errCode === -4) {
          toast.error("Phiên bản đăng nhập hết hạn");
          dispatch(logOut());
        } else {
          toast.error(err?.response?.data?.message);
        }
      } finally {
      }
    }
    router.push(path);
  };

  return (
    <Tippy
      interactive
      placement="bottom-end"
      delay={[0, 300]}
      render={(attrs) => (
        <div className="notification-container" tabIndex="-1" {...attrs}>
          <p className="notification-heading">Thông báo</p>
          {!isLoading ? (
            <Fragment>
              <div className="notification-filter">
                <p
                  className={`notification-filter-item ${
                    readStatus === "ALL" ? "selected" : null
                  }`}
                  onClick={() => handClickFilterNotification("ALL")}
                >
                  Tất cả
                </p>
                <p
                  className={`notification-filter-item ${
                    readStatus === "NOREAD" ? "selected" : null
                  }`}
                  onClick={() => handClickFilterNotification("NOREAD")}
                >
                  Chưa đọc
                </p>
              </div>
              <div className="notification-list">
                {notificationData && notificationData.length > 0 ? (
                  notificationData.map((notification, index) => {
                    return (
                      <div
                        className="notification-item"
                        key={index}
                        onClick={() =>
                          handleClickNotificationItem(
                            notification.id,
                            notification.status,
                            notification?.NotificationData?.path
                          )
                        }
                      >
                        {notification?.NotificationData?.message}
                        <p
                          className={`notification-time ${
                            notification.status === 0 ? null : "readed"
                          }`}
                        >
                          {formatTime(
                            notification?.NotificationData?.createdAt
                          )}
                        </p>
                        {notification.status === 0 ? (
                          <div className="notification-see-icon"></div>
                        ) : null}
                      </div>
                    );
                  })
                ) : (
                  <h1 style={{ padding: "10px 0", textAlign: "center" }}>
                    Không có thông báo
                  </h1>
                )}
              </div>
            </Fragment>
          ) : (
            <Skeleton
              height={65}
              width="100%"
              count={7}
              style={{ marginBottom: 6, borderRadius: 5 }}
            />
          )}
        </div>
      )}
    >
      <div style={{ position: "relative" }}>
        <CircleNotificationsIcon
          style={{
            height: 40,
            width: 40,
            color: "var(--white-color)",
            cursor: "pointer",
          }}
        ></CircleNotificationsIcon>
        <span
          style={{
            position: "absolute",
            top: -2,
            right: -3,
            display: "flex",
            fontSize: "0.8rem",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 600,
            height: 17,
            width: 17,
            borderRadius: "50%",
            backgroundColor: "var(--second-color)",
            color: "var(--white-color)",
          }}
        >
          {countNotificationNoRead}
        </span>
      </div>
    </Tippy>
  );
};

export default Notification;
