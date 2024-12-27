"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  handleGetInforUserService,
  handleUpdateUser,
} from "@/services/userService";
import dayjs from "dayjs";
import Image from "next/image";
import ModalChangePassword from "@/components/ModalChangePassword/ModalChangePassword";
import "./page.scss";
import { regex } from "@/utils";
import { logOut, updateAvatar } from "@/redux-toolkit/userSlice";
import { useDispatch } from "react-redux";
import { loadingProduct } from "@/redux-toolkit/productSlice";

function Profile() {
  const [avatar, setAvatar] = useState("/images/default-avatar.png");
  const [fileAvatar, setFileAvatar] = useState(null);
  const [oldFileAvatar, setOldFileAvatar] = useState(null);
  const [birth, setBirth] = useState(null);
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.userInfo?.id);
  const roleId = useSelector((state) => state.user.userInfo?.roleData?.roleId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  let getInforUser = async () => {
    dispatch(loadingProduct(true));
    try {
      let res = await handleGetInforUserService(userId);
      if (res && res.errCode === 0) {
        setName(res?.data?.userName);
        setValue("email", res?.data?.email);
        setValue("userName", res?.data?.userName);
        res?.data?.phoneNumber
          ? setValue("phone", res?.data?.phoneNumber)
          : setValue("phone", "");
        res?.data?.deliveryAddressData?.length > 0
          ? setValue("address", res?.data?.deliveryAddressData[0])
          : setValue("address", "");
        if (res?.data?.birthday)
          setBirth(dayjs(new Date(+res?.data?.birthday)));
        if (res?.data?.avatar) {
          setAvatar(res?.data?.avatar);
          dispatch(updateAvatar(res?.data?.avatar));
        }
      }
    } catch (err) {
      if (err?.response?.data?.errCode === 1) {
        toast.error("Thiếu tham số bắt buộc", {
          className: "toast-normal",
        });
      } else if (err?.response?.data?.errCode === 2) {
        toast.error("Người dùng không tồn tại", {
          className: "toast-normal",
        });
      } else if (err?.response?.data?.errCode === -4) {
        toast.error("Phiên bản đăng nhập hết hạn", {
          className: "toast-normal",
        });
        dispatch(logOut());
      } else {
        toast.error(err?.response?.data?.message, {
          className: "toast-normal",
        });
      }
    } finally {
      dispatch(loadingProduct(false));
    }
  };

  useEffect(() => {
    if (userId) getInforUser();
  }, [userId]);

  const handleCloseModalChangePassword = () => {
    setIsOpen(!isOpen);
  };

  const handleChangeAvatar = async (e) => {
    let file = e.target.files[0];
    setFileAvatar(file);
    if (file) {
      let objUrl = URL.createObjectURL(file);
      setAvatar(objUrl);
    }
  };

  const onSubmit = async (data) => {
    dispatch(loadingProduct(true));
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("userName", data.userName);
      formData.append("roleId", roleId);
      formData.append("id", userId);
      formData.append("phoneNumber", data.phone);
      formData.append("address", data.address);
      const birthday = birth && birth.$d ? birth.$d.getTime() : "";
      formData.append("birthday", birthday);

      if (fileAvatar && fileAvatar !== oldFileAvatar) {
        formData.append("avatar", fileAvatar);
      }

      let res = await handleUpdateUser(formData);
      if (res && res.errCode === 0) {
        setOldFileAvatar(fileAvatar);
        getInforUser();
        toast.success("Cập nhật thành công", {
          className: "toast-normal",
        });
      }
    } catch (err) {
      if (err?.response?.data?.errCode === 1) {
        toast.error("Thiếu tham số bắt buộc", {
          className: "toast-normal",
        });
      } else if (err?.response?.data?.errCode === 2) {
        toast.error("User không tồn tại", {
          className: "toast-normal",
        });
      } else if (err?.response?.data?.errCode === 3) {
        toast.error("Email đã tồn tại", {
          className: "toast-normal",
        });
      } else if (err?.response?.data?.errCode === 4) {
        toast.error("Tên người dùng đã tồn tại", {
          className: "toast-normal",
        });
      } else if (err?.response?.data?.errCode === 5) {
        toast.error("Số điện thoại đã tồn tại", {
          className: "toast-normal",
        });
      } else if (err?.response?.data?.errCode === -4) {
        toast.error("Phiên bản đăng nhập hết hạn", {
          className: "toast-normal",
        });
        dispatch(logOut());
      } else {
        toast.error(err?.response?.data?.message, {
          className: "toast-normal",
        });
      }
    } finally {
      dispatch(loadingProduct(false));
    }
  };

  return (
    <div className="user-page">
      <div className="user-container">
        <div className="username">
          <div className="user-wrap-avatar">
            <Image
              src={avatar}
              width={0}
              height={0}
              sizes="100vw"
              priority
              alt="avt"
              className="user-avatar-img"
              id="image"
            />
            <label htmlFor="image-upload">
              <FontAwesomeIcon className="upload-icon" icon={faSquarePlus} />
            </label>
            <input
              type="file"
              id="image-upload"
              onChange={(e) => handleChangeAvatar(e)}
            />
          </div>
          <h1>{name}</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="btn-pageuser">
            <button
              className="btn-change"
              onClick={() => {
                setIsOpen(true);
              }}
              type="button"
            >
              Đổi mật khẩu
            </button>

            <button
              className="btn-change"
              style={{ marginLeft: "2rem" }}
              type="submit"
            >
              Cập nhật
            </button>
          </div>

          <div className="user-info-container">
            <div className="user-info-element">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="user-info-input"
                id="email"
                readOnly
                {...register("email", {
                  required: "Nhập email của bạn",
                  pattern: {
                    value: regex.EMAIL,
                    message: "Email không hợp lệ",
                  },
                })}
              ></input>
              {errors.email && (
                <p className="user-info-error">{errors.email.message}</p>
              )}
            </div>
            <div className="user-info-element">
              <label htmlFor="userName">Họ và tên</label>
              <input
                type="text"
                className="user-info-input"
                id="userName"
                {...register("userName", {
                  required: "Nhập tên của bạn",
                  pattern: {
                    value: regex.USERNAME,
                    message: "Tên không hợp lệ",
                  },
                })}
              />
              {errors.userName && (
                <p className="user-info-error">{errors.userName.message}</p>
              )}
            </div>
            <div className="user-info-element">
              <label htmlFor="phone">Số điện thoại</label>
              <input
                className="user-info-input"
                id="phone"
                {...register("phone", {
                  pattern: {
                    value: regex.PHONE,
                    message: "Số điện thoại không hợp lệ",
                  },
                })}
              />
              {errors.phone && (
                <p className="user-info-error">{errors.phone.message}</p>
              )}
            </div>
            <div className="user-info-element">
              <label htmlFor="address">Địa chỉ</label>
              <div className="user-info-address">
                <input
                  type="text"
                  className="user-info-input"
                  id="address"
                  {...register("address")}
                />
              </div>
              {errors.address && (
                <p className="user-info-error">{errors.address.message}</p>
              )}
            </div>
            <div className="user-info-element">
              <label htmlFor="birth">Ngày sinh</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="date-picker"
                  sx={{
                    "& .MuiInputBase-root": {
                      height: 36,
                      fontSize: "var(--text-fontSize)",
                      color: "white",
                      fontWeight: "bold",
                    },
                  }}
                  format="DD/MM/YYYY"
                  maxDate={dayjs(new Date())}
                  onChange={(date) => setBirth(date)}
                  value={birth ? birth : null}
                />
              </LocalizationProvider>
            </div>
          </div>
        </form>
      </div>
      <ModalChangePassword
        open={isOpen}
        setIsOpen={setIsOpen}
        handleCloseModal={handleCloseModalChangePassword}
      ></ModalChangePassword>
    </div>
  );
}
export default Profile;
